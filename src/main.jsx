import { StrictMode, Suspense } from "react"; // 1. Suspense import qilindi
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import "./i18n.js";
import PageLoader from "./components/ui/PageLoader"; // 2. O'zingizni loaderingizni import qiling

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/* 3. Suspense bilan o'rab olindi */}
      <Suspense fallback={<PageLoader />}>
        <App />
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);
