import { useState, useEffect } from "react"; // <--- BU QATORNI QO'SHDIK
import { Routes, Route, useLocation } from "react-router-dom";
import PageLoader from "./components/ui/PageLoader";
import { AnimatePresence, motion } from "framer-motion";

// Layoutlar
import MainLayout from "./components/layout/MainLayout";
import AdminLayout from "./pages/admin/AdminLayout";
import RequireAuth from "./components/auth/RequireAuth";

// Public Sahifalar (Barcha importlar joyida)
import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import News from "./pages/public/News";
import NewsDetail from "./pages/public/NewsDetail";
import PublicTeachers from "./pages/public/Teachers";
import Apply from "./pages/public/Apply";
import Documents from "./pages/public/Documents";
import InfoPortal from "./pages/public/InfoPortal";

// Admin Sahifalar (Barcha importlar joyida)
import DashboardHome from "./pages/admin/DashboardHome";
import AdminNews from "./pages/admin/AddNews";
import AdminStats from "./pages/admin/AdminStats";
import AdminTeachers from "./pages/admin/AdminTeachers";
import AdminApplicants from "./pages/admin/AdminApplicants";
import AdminDocuments from "./pages/admin/AdminDocuments";
import AdminQuickLinks from "./pages/admin/AdminQuickLinks";

function App() {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const location = useLocation();

  // Birinchi marta kirgandagi loader
  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Sahifa almashishini boshqarish
  useEffect(() => {
    // URL o'zgarganda Loaderni bir zumga yoqamiz
    setIsPageLoading(true);

    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 600); // Bu vaqt sahifa render bo'lishi uchun yetarli

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {/* 1. Global Loader AnimatePresence ichida */}
      <AnimatePresence mode="wait">
        {isPageLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: "fixed", inset: 0, zIndex: 9999 }}
          >
            <PageLoader />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Sahifa komponentlari */}
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }} // Loader ko'rinib turganda orqada yuklanadi
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="news" element={<News />} />
            <Route path="news/:id" element={<NewsDetail />} />
            <Route path="teachers" element={<PublicTeachers />} />
            <Route path="documents" element={<Documents />} />
            <Route path="/info" element={<InfoPortal />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/apply" element={<Apply />} />

          {/* 2. PROTECTED ADMIN ROUTES */}
          <Route element={<RequireAuth />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="news" element={<AdminNews />} />
              <Route path="statistics" element={<AdminStats />} />
              <Route path="teachers" element={<AdminTeachers />} />
              <Route path="documents" element={<AdminDocuments />} />
              <Route path="applicants" element={<AdminApplicants />} />
              <Route path="quicklinks" element={<AdminQuickLinks />} />
            </Route>
          </Route>
        </Routes>
      </motion.div>
    </>
  );
}

export default App;
