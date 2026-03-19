import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * 兒童發展篩檢評估記錄表
 * 儲存每次評估的完整資料
 */
export const assessmentRecords = mysqlTable("assessment_records", {
  id: int("id").autoincrement().primaryKey(),
  
  // 關聯用戶
  userId: int("userId").notNull(),
  
  // 基本資料
  childName: varchar("childName", { length: 255 }).notNull(),
  idNumber: varchar("idNumber", { length: 20 }),
  gender: mysqlEnum("gender", ["M", "F"]),
  birthDate: varchar("birthDate", { length: 20 }).notNull(), // 民國年格式 (e.g., 110-03-15)
  testDate: varchar("testDate", { length: 20 }).notNull(), // 民國年格式
  ageInMonths: int("ageInMonths").notNull(), // 計算出的年齡（月份）
  ageGroup: varchar("ageGroup", { length: 50 }).notNull(), // 年齡層名稱 (e.g., "6-9個月")
  
  // 照護問題
  careQuestion1: mysqlEnum("careQuestion1", ["yes", "no"]),
  careQuestion1Description: text("careQuestion1Description"),
  careQuestion2: mysqlEnum("careQuestion2", ["yes", "no"]),
  careQuestion2Description: text("careQuestion2Description"),
  careQuestion3: mysqlEnum("careQuestion3", ["yes", "no"]),
  careQuestion3Description: text("careQuestion3Description"),
  
  // 評分資料（JSON 格式存儲各領域的題目與回答）
  grossMotorScores: json("grossMotorScores"), // 粗大動作評分
  fineMotorScores: json("fineMotorScores"), // 精細動作評分
  cognitiveLanguageScores: json("cognitiveLanguageScores"), // 認知語言評分
  socialDevelopmentScores: json("socialDevelopmentScores"), // 社會發展評分
  
  // 評估結果
  grossMotorTotal: int("grossMotorTotal"),
  fineMotorTotal: int("fineMotorTotal"),
  cognitiveLanguageTotal: int("cognitiveLanguageTotal"),
  socialDevelopmentTotal: int("socialDevelopmentTotal"),
  
  // 通過/不通過狀態
  grossMotorStatus: mysqlEnum("grossMotorStatus", ["pass", "fail"]),
  fineMotorStatus: mysqlEnum("fineMotorStatus", ["pass", "fail"]),
  cognitiveLanguageStatus: mysqlEnum("cognitiveLanguageStatus", ["pass", "fail"]),
  socialDevelopmentStatus: mysqlEnum("socialDevelopmentStatus", ["pass", "fail"]),
  
  // 治療建議
  recommendation: text("recommendation"),
  
  // PDF 檔案存儲
  pdfFileKey: varchar("pdfFileKey", { length: 255 }), // S3 檔案鍵
  pdfFileUrl: text("pdfFileUrl"), // S3 檔案 URL
  
  // 時間戳
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AssessmentRecord = typeof assessmentRecords.$inferSelect;
export type InsertAssessmentRecord = typeof assessmentRecords.$inferInsert;