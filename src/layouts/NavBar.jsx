import menuhamburguesa from "../../public/img/Menu.png";
import menuhamburguesa2 from "../../public/img/Menu.svg";
import { useState } from "react";
import Display from "../components/Display";
import logoSimple from "../../public/img/logoSimple.png";
import { useLocation } from "react-router-dom";

function NavBar() {
  const [open, setOpen] = useState(false);
  const displayMenu = () => {
    setOpen(!open);
  };
  const location = useLocation();

  return (
    <>
      <nav className="w-full flex p-4 z-30 justify-between absolute lg:p-10 lg:flex">
        <img
          src={location.pathname.startsWith("/chapterPage") ? menuhamburguesa2 : menuhamburguesa}
          alt="hamburguesa"
          onClick={displayMenu}
          className="cursor-pointer"
        />
        <div className="flex items-center">
          <p className={`lg:flex items-center hidden text-4xl ${location.pathname.startsWith("/chapterPage") ? "text-white" : "text-orange-600"}`}>
            Minga
          </p>
          <img
            className="h-10 object-contain"
            src={logoSimple}
            alt="logo minga"
          />
        </div>
      </nav>

      <Display close={open} switchMenu={displayMenu} />
    </>
  );
}

export default NavBar;
