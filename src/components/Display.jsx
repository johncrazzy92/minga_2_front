import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import apiClient from "../services/apiClient.js";
import logoutUser from "../redux/actions/logout";

function Display({ close, switchMenu }) {
  const { user } = useSelector((store) => store.me_authorsReducer);
  const dispatch = useDispatch();

  const signout = async () => {
    try {
      await apiClient.post("/auth/signout");
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatch(logoutUser());
      switchMenu();
    }
  };

  if (!close) return null;

  return (
    <>
      {/* Backdrop overlay to close menu when clicking outside */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 transition-opacity"
        onClick={switchMenu}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className="w-4/5 sm:w-80 fixed bg-gradient-to-b from-orange-500 to-orange-600 h-screen flex flex-col top-0 left-0 z-50 px-5 py-6 shadow-2xl transition-transform duration-300"
      >
        <div className="flex justify-between items-center text-white pb-4 border-b border-orange-400/60">
          <div className="flex items-center gap-3">
            <img
              className="h-10 w-10 rounded-full object-cover border-2 border-white/80 shadow-sm"
              src={user?.photo || "/img/image 15.jpg"}
              alt="Profile"
              onError={(e) => {
                e.target.src = "/img/image 15.jpg";
              }}
            />
            <div className="flex flex-col text-left">
              <span className="font-bold text-sm truncate max-w-[170px] text-white">
                {user ? user.email : "Invitado"}
              </span>
              <span className="text-xs text-orange-200 font-medium">
                {user?.role === 3 ? "Administrador" : user?.role === 1 ? "Autor" : "Lector"}
              </span>
            </div>
          </div>
          <button
            onClick={switchMenu}
            className="p-1.5 rounded-full hover:bg-white/10 active:scale-95 transition cursor-pointer text-white"
            aria-label="Cerrar menú"
          >
            <img
              className="w-5 h-5"
              src="/img/filled.svg"
              alt="Cerrar"
            />
          </button>
        </div>

        <nav className="text-white flex flex-col text-left gap-1 pt-6 text-base font-semibold flex-1 overflow-y-auto">
          <Link
            onClick={switchMenu}
            className="py-3 px-4 rounded-xl hover:bg-white hover:text-orange-600 transition duration-150 flex items-center gap-3"
            to="/"
          >
            <span>Home</span>
          </Link>

          <Link
            onClick={switchMenu}
            className="py-3 px-4 rounded-xl hover:bg-white hover:text-orange-600 transition duration-150 flex items-center gap-3"
            to="/mangas"
          >
            <span>Mangas</span>
          </Link>

          {user !== null ? (
            <>
              <Link
                onClick={switchMenu}
                className="py-3 px-4 rounded-xl hover:bg-white hover:text-orange-600 transition duration-150 flex items-center gap-3"
                to="/author/me"
              >
                <span>Profile</span>
              </Link>

              {(user.role === 1 || user.role === 2 || user.role === 3) && (
                <>
                  <Link
                    onClick={switchMenu}
                    className="py-3 px-4 rounded-xl hover:bg-white hover:text-orange-600 transition duration-150 flex items-center gap-3"
                    to="/mymangas"
                  >
                    <span>My Mangas</span>
                  </Link>
                </>
              )}

              {user.role === 3 && (
                <Link
                  onClick={switchMenu}
                  className="py-3 px-4 rounded-xl hover:bg-white hover:text-orange-600 transition duration-150 flex items-center gap-3"
                  to="/admin"
                >
                  <span>Admin Panel</span>
                </Link>
              )}


              <div className="mt-auto pt-6 pb-2">
                <button
                  onClick={signout}
                  className="w-full py-3 px-4 rounded-xl bg-white/95 text-orange-600 hover:bg-white font-bold transition duration-150 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Sign out</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                onClick={switchMenu}
                to="/login"
                className="py-3 px-4 rounded-xl hover:bg-white hover:text-orange-600 transition duration-150 flex items-center gap-3"
              >
                <span>Sign in</span>
              </Link>
              <Link
                onClick={switchMenu}
                to="/register"
                className="py-3 px-4 rounded-xl hover:bg-white hover:text-orange-600 transition duration-150 flex items-center gap-3"
              >
                <span>Register</span>
              </Link>
              <Link
                onClick={switchMenu}
                className="py-3 px-4 rounded-xl hover:bg-white hover:text-orange-600 transition duration-150 flex items-center gap-3"
                to="/donations"
              >
                <span>Donations</span>
              </Link>
            </>
          )}
        </nav>
      </aside>
    </>
  );
}

Display.propTypes = {
  close: PropTypes.bool.isRequired,
  switchMenu: PropTypes.func.isRequired,
};

export default Display;