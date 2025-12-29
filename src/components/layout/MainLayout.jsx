import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import TopBar from "../../components/layout/TopBar";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Navbar />

      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
