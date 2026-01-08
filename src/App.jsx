import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import PageLoader from "./components/ui/PageLoader";
import { AnimatePresence, motion } from "framer-motion";

// cursor

import CustomCursor from "./components/ui/CustomCursor";

// Sahifalar
import MainLayout from "./components/layout/MainLayout";
import AdminLayout from "./pages/admin/AdminLayout";
import RequireAuth from "./components/auth/RequireAuth";

// Public Sahifalar
import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import News from "./pages/public/News";
import NewsDetail from "./pages/public/NewsDetail";
import PublicTeachers from "./pages/public/Teachers";
import Apply from "./pages/public/Apply";
import Documents from "./pages/public/Documents";
import InfoPortal from "./pages/public/InfoPortal";
import Admission from "./pages/public/Admission";
import NotFound from "./pages//NotFound";
import Management from "./pages/public/Management";

// Admin Sahifalar
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

  // Scrollni tepaga qaytarish (Yangi qo'shimcha: UX uchun muhim)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setIsPageLoading(true);
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
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

      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <CustomCursor />
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="news" element={<News />} />
            <Route path="news/:id" element={<NewsDetail />} />
            <Route path="teachers" element={<PublicTeachers />} />
            <Route path="documents" element={<Documents />} />
            <Route path="info" element={<InfoPortal />} />
            <Route path="qabul" element={<Admission />} />
            <Route path="management" element={<Management />} />

            {/* 2. PUBLIC NOTFOUND - Noto'g'ri URL yozilsa MainLayout ichida chiqadi */}
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/apply" element={<Apply />} />

          <Route element={<RequireAuth />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="news" element={<AdminNews />} />
              <Route path="statistics" element={<AdminStats />} />
              <Route path="teachers" element={<AdminTeachers />} />
              <Route path="documents" element={<AdminDocuments />} />
              <Route path="applicants" element={<AdminApplicants />} />
              <Route path="quicklinks" element={<AdminQuickLinks />} />

              {/* 3. ADMIN NOTFOUND - Admin panel ichida xato yo'l yozilsa */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>

          {/* 4. GLOBAL NOTFOUND - Mutlaqo begona URL'lar uchun */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </>
  );
}

export default App;
