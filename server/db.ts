import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, assessmentRecords, InsertAssessmentRecord, AssessmentRecord } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * 建立評估記錄
 */
export async function createAssessmentRecord(data: InsertAssessmentRecord): Promise<AssessmentRecord | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create assessment: database not available");
    return null;
  }

  try {
    const result = await db.insert(assessmentRecords).values(data);
    const recordId = (result as any)[0]?.insertId;
    if (!recordId) return null;
    
    const record = await db.select().from(assessmentRecords).where(eq(assessmentRecords.id, recordId as number)).limit(1);
    return record.length > 0 ? record[0] : null;
  } catch (error) {
    console.error("[Database] Failed to create assessment:", error);
    throw error;
  }
}

/**
 * 獲取用戶的所有評估記錄
 */
export async function getUserAssessments(userId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get assessments: database not available");
    return [];
  }

  try {
    return await db.select().from(assessmentRecords).where(eq(assessmentRecords.userId, userId));
  } catch (error) {
    console.error("[Database] Failed to get assessments:", error);
    return [];
  }
}

/**
 * 獲取單個評估記錄
 */
export async function getAssessmentById(id: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get assessment: database not available");
    return null;
  }

  try {
    const result = await db.select().from(assessmentRecords).where(eq(assessmentRecords.id, id)).limit(1);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to get assessment:", error);
    return null;
  }
}

/**
 * 更新評估記錄
 */
export async function updateAssessmentRecord(id: number, data: Partial<InsertAssessmentRecord>) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update assessment: database not available");
    return null;
  }

  try {
    await db.update(assessmentRecords).set(data).where(eq(assessmentRecords.id, id));
    return await getAssessmentById(id);
  } catch (error) {
    console.error("[Database] Failed to update assessment:", error);
    throw error;
  }
}

/**
 * 刪除評估記錄
 */
export async function deleteAssessmentRecord(id: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete assessment: database not available");
    return false;
  }

  try {
    await db.delete(assessmentRecords).where(eq(assessmentRecords.id, id));
    return true;
  } catch (error) {
    console.error("[Database] Failed to delete assessment:", error);
    return false;
  }
}

// TODO: add feature queries here as your schema grows.
