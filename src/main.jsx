import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async"; // 1. Providerni import qiling
import "./index.css";
import App from "./App.jsx";
import "./i18n.js";
import PageLoader from "./components/ui/PageLoader";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      {" "}
      {/* 2. HelmetProvider barcha narsadan tepada turishi kerak */}
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <App />
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
