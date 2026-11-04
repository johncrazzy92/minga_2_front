import { useState } from 'react';
import apiClient from '../services/apiClient.js';
import NavBar from '../layouts/NavBar';

const Donations = () => {
  const [loading, setLoading] = useState(false);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, amount: 0, paymentUrl: null });
  const [notification, setNotification] = useState(null);

  const handleDonationClick = async (amount = 1000) => {
    setLoading(true);
    try {
      const response = await apiClient.post('/payment/create-order10');
      const linkPago = response.data?.init_point;

      if (!linkPago) {
        setNotification({
          type: 'info',
          title: 'Donation Service',
          message: 'Payment simulation link is currently unavailable.',
        });
        return;
      }

      setConfirmModal({
        isOpen: true,
        amount: amount,
        paymentUrl: linkPago,
      });
    } catch (error) {
      console.error("Error creating donation order:", error);
      setNotification({
        type: 'error',
        title: 'Connection Error',
        message: 'Could not connect to payment gateway. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPayment = () => {
    if (confirmModal.paymentUrl) {
      window.location.href = confirmModal.paymentUrl;
    }
  };

  return (
    <>
      <NavBar />
      <div
        className='w-full min-h-screen bg-cover bg-center flex flex-col items-center justify-center pt-28 pb-16 px-4 relative'
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.88), rgba(255,247,237,0.92)), url('/img/fondoDonations')" }}
      >
        <div className="max-w-3xl w-full text-center flex flex-col items-center mb-10">
          <span className="bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
            Apoyo a la comunidad
          </span>
          <h1 className='text-3xl md:text-5xl text-center font-extrabold text-gray-900 tracking-tight leading-tight'>
            Tu contribución impulsa a los autores de <span className="text-orange-600">Minga</span>
          </h1>
          <p className="mt-4 text-gray-600 text-base max-w-xl">
            Ayúdanos a mantener la plataforma rápida, gratuita y llena de mangas nuevos apoyando directamente a los creadores.
          </p>
        </div>

        <div className='flex flex-wrap w-full max-w-3xl gap-6 justify-center items-center'>
          <button
            onClick={() => handleDonationClick(1000)}
            disabled={loading}
            className="w-full sm:w-60 bg-white/95 backdrop-blur-sm border-2 border-orange-200 hover:border-orange-500 text-gray-800 hover:text-orange-600 font-bold p-6 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-200 cursor-pointer disabled:opacity-50 flex flex-col items-center gap-2"
          >
            <span className="text-sm font-semibold text-orange-500 uppercase tracking-wide">Aporte Fan</span>
            <span className="text-3xl font-extrabold text-gray-900">$1.000</span>
            <span className="text-xs text-gray-500">Un café para el autor ☕</span>
          </button>
          <button
            onClick={() => handleDonationClick(5000)}
            disabled={loading}
            className="w-full sm:w-60 bg-white/95 backdrop-blur-sm border-2 border-orange-500 text-gray-800 hover:text-orange-600 font-bold p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-200 cursor-pointer disabled:opacity-50 flex flex-col items-center gap-2 ring-2 ring-orange-200"
          >
            <span className="text-sm font-bold text-orange-600 uppercase tracking-wide">Más Popular ⭐</span>
            <span className="text-3xl font-extrabold text-orange-600">$5.000</span>
            <span className="text-xs text-gray-500">Apoyo a capítulos nuevos 📖</span>
          </button>
          <button
            onClick={() => handleDonationClick(10000)}
            disabled={loading}
            className="w-full sm:w-60 bg-white/95 backdrop-blur-sm border-2 border-orange-200 hover:border-orange-500 text-gray-800 hover:text-orange-600 font-bold p-6 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-200 cursor-pointer disabled:opacity-50 flex flex-col items-center gap-2"
          >
            <span className="text-sm font-semibold text-orange-500 uppercase tracking-wide">Super Fan 👑</span>
            <span className="text-3xl font-extrabold text-gray-900">$10.000</span>
            <span className="text-xs text-gray-500">Impulso total a la serie 🚀</span>
          </button>
        </div>

        {/* Confirmation Modal aligned with Minga Design System */}
        {confirmModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-xl max-w-sm w-11/12 p-6 flex flex-col items-center text-center border border-orange-100">
              <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mb-4 ring-4 ring-orange-50">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-2">Confirmar donación</h2>
              <p className="text-gray-600 text-sm mb-6">
                ¿Deseas continuar con la donación de <span className="font-bold text-orange-600 text-base">${confirmModal.amount.toLocaleString()}</span>?
              </p>

              <div className="flex gap-3 w-full">
                <button
                  type="button"
                  onClick={() => setConfirmModal({ isOpen: false, amount: 0, paymentUrl: null })}
                  className="w-1/2 py-2.5 px-4 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition cursor-pointer text-sm"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleConfirmPayment}
                  className="w-1/2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold shadow-md hover:shadow-lg transition cursor-pointer text-sm"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Toast / Notification Alert */}
        {notification && (
          <div className="fixed bottom-6 right-6 z-50 bg-white border border-orange-200 rounded-xl shadow-lg p-4 max-w-sm flex items-start gap-3 animate-slideUp">
            <div className={`p-2 rounded-lg ${notification.type === 'error' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-800 text-sm">{notification.title}</h4>
              <p className="text-xs text-gray-600 mt-0.5">{notification.message}</p>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="text-gray-400 hover:text-gray-600 text-sm font-bold ml-1 cursor-pointer"
            >
              ×
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Donations;

