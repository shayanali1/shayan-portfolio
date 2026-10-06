import { lazy, Suspense } from "react";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
import ErrorBoundary from "./components/ErrorBoundary";
import { LoadingProvider } from "./context/LoadingProvider";

const App = () => {
  return (
    <ErrorBoundary>
      <LoadingProvider>
        <Suspense fallback={null}>
          <MainContainer>
            <Suspense fallback={null}>
              <ErrorBoundary fallback={<div className="character-container" />}>
                <CharacterModel />
              </ErrorBoundary>
            </Suspense>
          </MainContainer>
        </Suspense>
      </LoadingProvider>
    </ErrorBoundary>
  );
};

export default App;
