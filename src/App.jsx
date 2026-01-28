import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import PageLoader from "./components/ui/PageLoader";
import ScrollProgress from "./components/ui/ScrollProgress";

// Layouts
import MainLayout from "./components/layout/MainLayout";
import AdminLayout from "./pages/admin/AdminLayout";
import RequireAuth from "./components/auth/RequireAuth";

// Public pages
import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import News from "./pages/public/News";
import NewsDetail from "./pages/public/NewsDetail";
import PublicTeachers from "./pages/public/Teachers";
import Apply from "./pages/public/Apply";
import Documents from "./pages/public/Documents";
import InfoPortal from "./pages/public/InfoPortal";
import Admission from "./pages/public/Admission";
import Management from "./pages/public/Management";
import VideoTour from "./pages/public/VideoTour";
import NotFound from "./pages/NotFound";

// Admin pages
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

  // scroll top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // first boot loader
  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  // route change loader
  useEffect(() => {
    setIsPageLoading(true);
    const timer = setTimeout(() => setIsPageLoading(false), 450);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <ScrollProgress />

      <AnimatePresence mode="wait">
        {isPageLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
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
        transition={{ duration: 0.35, delay: 0.05 }}
      >
        <Routes location={location} key={location.pathname}>
          {/* Public */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="news" element={<News />} />
            <Route path="news/:id" element={<NewsDetail />} />
            <Route path="teachers" element={<PublicTeachers />} />
            <Route path="documents" element={<Documents />} />
            <Route path="info" element={<InfoPortal />} />
            <Route path="qabul" element={<Admission />} />
            <Route path="management" element={<Management />} />
            <Route path="video-tour" element={<VideoTour />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/apply" element={<Apply />} />

          {/* Admin */}
          <Route element={<RequireAuth />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="news" element={<AdminNews />} />
              <Route path="statistics" element={<AdminStats />} />
              <Route path="teachers" element={<AdminTeachers />} />
              <Route path="documents" element={<AdminDocuments />} />
              <Route path="applicants" element={<AdminApplicants />} />
              <Route path="quicklinks" element={<AdminQuickLinks />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>

          {/* Global */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </>
  );
}

export default App;
