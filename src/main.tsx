import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { preloadCharacterFile } from "./components/Character/utils/decrypt";

// Kick off character download in parallel with bundle parsing
preloadCharacterFile();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
