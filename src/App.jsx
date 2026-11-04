import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import signinToken from './redux/actions/session.js';
import router from "./router/router.jsx";
import { RouterProvider } from "react-router-dom";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      dispatch(signinToken(token));
    }
  }, [dispatch]);

  return <RouterProvider router={router} />;
}