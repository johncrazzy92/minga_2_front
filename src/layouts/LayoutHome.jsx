import NavBar from "./NavBar";
import background from "../../public/img/Background.png";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const LayoutHome = () => {
  return (
    <>
      <div
        className="w-full bg-cover bg-left flex flex-col justify-start lg:justify-between lg:gap-16 h-screen"
        style={{ backgroundImage: `url(${background})` }}
      >
        <NavBar />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default LayoutHome;
