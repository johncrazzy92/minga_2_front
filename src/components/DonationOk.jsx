import { Link } from "react-router-dom";
import NavBar from "../layouts/NavBar";
import Footer from "../components/Footer";

const DonationOk = () => {
  return (
    <>
      <NavBar />
      <main
        className="w-full min-h-screen bg-cover bg-center flex flex-col items-center justify-center pt-24 pb-16 px-4 relative"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.85), rgba(255,247,237,0.92)), url('/img/fondoDonations')" }}
      >
        <div className="w-full max-w-lg bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-orange-100 p-8 sm:p-12 flex flex-col items-center text-center">
          {/* Celebratory Heart Icon */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white shadow-lg shadow-orange-500/25 mb-6 ring-8 ring-orange-100/70">
            <svg
              className="w-10 h-10"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>

          {/* Status Badge */}
          <span className="bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
            ¡Aporte Recibido!
          </span>

          {/* Headings */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
            ¡Muchas gracias por tu apoyo!
          </h1>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-sm mb-8">
            Tu contribución apoya directamente a los autores independientes y nos ayuda a mantener Minga libre de anuncios molestos y accesible para todos.
          </p>

          {/* Navigation Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3.5 w-full">
            <Link
              to="/mangas"
              className="w-full sm:w-1/2 py-3.5 px-5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold shadow-md shadow-orange-500/20 hover:shadow-lg transition duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explorar Mangas</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link
              to="/"
              className="w-full sm:w-1/2 py-3.5 px-5 rounded-xl bg-white hover:bg-gray-50 text-gray-700 font-semibold border border-gray-300 hover:border-gray-400 transition duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              Volver al Inicio
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DonationOk;

