import { useEffect, useState } from "react";
import apiClient from '../services/apiClient.js';
import { useNavigate } from 'react-router-dom';
import NavBar from "../layouts/NavBar";
import Footer from "./Footer";

const Verify = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying"); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState("Verifying your account...");

  const verifyAccount = async () => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");

    if (!code) {
      setStatus("error");
      setMessage("Invalid verification link. No verification code found.");
      return;
    }

    try {
      await apiClient.get(`/auth/verify/${code}`);
      setStatus("success");
      setMessage("Your account has been successfully verified! Redirecting to sign in...");
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (error) {
      console.error("Verification error:", error);
      setStatus("error");
      setMessage(error.response?.data?.message || "Verification code is invalid or has expired.");
    }
  };

  useEffect(() => {
    verifyAccount();
  }, []);

  return (
    <>
      <NavBar />
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4 pt-20">
        <div className="bg-white p-8 rounded-3xl shadow-md max-w-md w-full text-center">
          {status === "verifying" && (
            <>
              <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Verifying Account</h1>
              <p className="text-gray-500 text-sm">{message}</p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="w-12 h-12 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 font-bold">
                ✓
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Account Verified!</h1>
              <p className="text-gray-500 text-sm mb-4">{message}</p>
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition text-sm"
              >
                Sign In Now
              </button>
            </>
          )}

          {status === "error" && (
            <>
              <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 font-bold">
                ✕
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Verification Failed</h1>
              <p className="text-red-500 text-sm mb-6">{message}</p>
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition text-sm"
              >
                Back to Login
              </button>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Verify;