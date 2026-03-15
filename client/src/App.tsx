import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { QuestionnaireProvider } from "./contexts/QuestionnaireContext";
import NavigationBar, { PageType } from "./components/NavigationBar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import BasicInfoPage from "./pages/BasicInfoPage";
import QuestionnairePage from "./pages/QuestionnairePage";
import ResultPage from "./pages/ResultPage";

function Router() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 主要內容 */}
      <div className="flex-1">
        {currentPage === 'home' && (
          <HomePage onStart={() => handleNavigate('info')} />
        )}
        {currentPage === 'info' && (
          <BasicInfoPage onNext={() => handleNavigate('gross')} />
        )}
        {currentPage === 'gross' && (
          <QuestionnairePage area="gross" />
        )}
        {currentPage === 'fine' && (
          <QuestionnairePage area="fine" />
        )}
        {currentPage === 'cognitive' && (
          <QuestionnairePage area="cognitive" />
        )}
        {currentPage === 'social' && (
          <QuestionnairePage area="social" />
        )}
        {currentPage === 'result' && (
          <ResultPage />
        )}
      </div>

      {/* 導航欄 */}
      {currentPage !== 'home' && (
        <NavigationBar
          currentPage={currentPage}
          onNavigate={handleNavigate}
        />
      )}

      {/* 頁尾 */}
      {currentPage !== 'home' && <Footer />}
    </div>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <QuestionnaireProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </QuestionnaireProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
