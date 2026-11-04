import { useRef, useState } from 'react';
import NavBar from '../layouts/NavBar';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import apiClient from "../services/apiClient.js";
import saveAuthors from '../redux/actions/me_authors';
import Alert from '../components/componentesMangas/Alert.jsx';
import { GoogleLogin } from '@react-oauth/google';
import Swal from 'sweetalert2';

const Login = () => {
  const email = useRef();
  const password = useRef();
  const [alert, setAlert] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function enviarData() {
    const data = {
      email: email.current?.value,
      password: password.current?.value,
    };

    if (!data.email || !data.password) {
      setAlert(["Please provide both email and password."]);
      setShow(true);
      return;
    }

    setLoading(true);
    try {
      const credenciales = await apiClient.post("/auth/signin", data);
      const tokenData = credenciales.data.response;
      dispatch(saveAuthors(tokenData));
      localStorage.setItem('token', tokenData.token);
      localStorage.setItem('user', tokenData.user.email);

      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      const rawMsg = error.response?.data?.message || 'Invalid email or password.';
      setAlert(Array.isArray(rawMsg) ? rawMsg : [rawMsg]);
      setShow(true);
    } finally {
      setLoading(false);
    }
  }

  const handleLogin = async (googleData) => {
    const data = {
      token: googleData.credential,
    };

    try {
      const res = await apiClient.post('/auth/google-signin', data);
      const tokenData = res.data.response;
      dispatch(saveAuthors(tokenData));
      localStorage.setItem('token', tokenData.token);
      localStorage.setItem('user', tokenData.user.email);
      navigate("/");

      Swal.fire({
        icon: 'success',
        title: 'Logged in successfully',
        text: 'Welcome back!',
      });
    } catch (error) {
      console.error("Google login error:", error);
      const rawMsg = error.response?.data?.message || 'Error signing in with Google.';
      setAlert(Array.isArray(rawMsg) ? rawMsg : [rawMsg]);
      setShow(true);

      Swal.fire({
        icon: 'error',
        title: 'Authentication Error',
        text: 'Could not sign in with Google.',
      });
    }
  };

  const handleFailure = (result) => {
    console.error("Google Signin failed:", result);
  };

  return (
    <>
      {show && <Alert setShow={setShow} show={show} alert={alert} />}
      <NavBar />
      <div className='w-full min-h-screen flex pt-16'>
        <div
          className='w-1/2 min-h-screen bg-cover bg-center hidden md:block'
          style={{ backgroundImage: "url('/img/img-login.png')" }}
        ></div>
        <div className='flex w-full md:w-1/2 min-h-screen flex-col justify-center items-center px-6 py-12'>
          <div className='flex flex-col justify-center items-center max-w-md w-full gap-2 text-center'>
            <div className='flex items-center gap-2'>
              <p className='text-3xl font-bold text-orange-500'>Minga</p>
              <img className='w-8 h-8' src="/img/logoSimple.png" alt="Minga" />
            </div>
            <div className='flex items-center gap-2'>
              <p className='text-3xl font-bold text-black'>Welcome</p>
              <p className='text-3xl font-bold text-orange-500'>back!</p>
            </div>
            <p className='text-gray-500 text-sm'>
              Discover manga, manhua and manhwa, track your progress, have fun, read manga.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                enviarData();
              }}
              className='w-full flex flex-col gap-4 mt-6 text-left'
            >
              <div>
                <label className='text-xs font-semibold text-gray-700'>Email</label>
                <input
                  ref={email}
                  type="email"
                  name="email"
                  id="email"
                  className="h-11 w-full px-3 mt-1 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-orange-500"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className='text-xs font-semibold text-gray-700'>Password</label>
                <input
                  ref={password}
                  type="password"
                  name="password"
                  id="password"
                  className="h-11 w-full px-3 mt-1 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-orange-500"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className='w-full h-11 rounded-full text-white font-bold bg-orange-500 hover:bg-orange-600 transition shadow disabled:opacity-50 mt-2'
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className='w-full flex justify-center mt-4'>
              <GoogleLogin
                buttonText="Log in with Google"
                onSuccess={handleLogin}
                onError={handleFailure}
              />
            </div>

            <div className='flex justify-center gap-1 pt-4 text-sm'>
              <span className='text-gray-600'>Don&apos;t have an account yet?</span>
              <Link to="/register" className='text-orange-600 font-bold hover:underline'>
                Sign up
              </Link>
            </div>

            <div className='flex justify-center gap-1 pt-1 text-xs'>
              <span className='text-gray-500'>Go back to</span>
              <Link to="/" className='text-orange-600 font-bold hover:underline'>
                home page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;