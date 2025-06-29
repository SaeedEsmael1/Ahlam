import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
export const Layout = () => {
  return (
    <div>
      <NavBar />
      <div className="outlet">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
