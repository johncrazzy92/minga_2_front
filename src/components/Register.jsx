import { useState } from 'react';
import apiClient from '../services/apiClient.js';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../layouts/NavBar';
import Footer from './Footer';
import Alert from './componentesMangas/Alert';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import saveAuthors from '../redux/actions/me_authors';
import Swal from 'sweetalert2';

const Register = () => {
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState('');
  const [password, setPassword] = useState('');
  const [sendNotification, setSendNotification] = useState(false);
  const [alert, setAlert] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUpClick = async () => {
    const data = {
      email,
      password,
      photo: photo || undefined,
    };

    setLoading(true);
    try {
      const response = await apiClient.post('/auth/register', data);
      const rawMsg = response.data?.message || 'Registration successful! Please check your email to verify.';
      const msgs = Array.isArray(rawMsg) ? rawMsg : [rawMsg];
      setAlert(msgs);
      setShow(true);

      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'Your account was created! Check your email to verify your account before logging in.',
      }).then(() => {
        navigate('/login');
      });
    } catch (error) {
      console.error('Error during registration:', error);
      const rawMsg = error.response?.data?.message || 'Registration failed. Please check your details.';
      const msgs = Array.isArray(rawMsg) ? rawMsg : [rawMsg];
      setAlert(msgs);
      setShow(true);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginWithGoogle = async (googleData) => {
    const data = {
      token: googleData.credential,
    };

    try {
      const res = await apiClient.post('/auth/google-signin', data);
      const tokenData = res.data.response;
      dispatch(saveAuthors(tokenData));
      localStorage.setItem('token', tokenData.token);
      localStorage.setItem('user', tokenData.user.email);

      Swal.fire({
        icon: 'success',
        title: 'Welcome to Minga!',
        text: 'Logged in successfully with Google!',
      }).then(() => {
        navigate('/');
      });
    } catch (error) {
      console.error('Google signin error:', error);
      const rawMsg = error.response?.data?.message || 'Failed to authenticate with Google';
      const msgs = Array.isArray(rawMsg) ? rawMsg : [rawMsg];
      setAlert(msgs);
      setShow(true);
    }
  };

  const handleLoginFailure = (error) => {
    console.error('Error on Google login:', error);
    Swal.fire({
      icon: 'error',
      title: 'Google Sign-in',
      text: 'Could not connect with Google.',
    });
  };

  return (
    <>
      {show && <Alert alert={alert} setShow={setShow} show={show} />}
      <NavBar />
      <div className='flex min-h-screen pt-16'>
        <div className='w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12'>
          <div className='flex flex-col w-full max-w-md items-center text-center'>
            <img src="/img/Logo Dos.png" alt="Minga" className="h-16 mb-4" />
            <h1 className='text-3xl font-bold text-gray-800 mb-2'>Welcome!</h1>
            <p className='text-gray-500 text-sm mb-6'>
              Discover manga, manhua and manhwa, track your progress, have fun, read manga.
            </p>

            <div className='w-full flex flex-col gap-4'>
              <input
                type="email"
                className='border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 w-full'
                placeholder='Email: your-email@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="url"
                className='border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 w-full'
                placeholder='Photo URL (optional)'
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
              />
              <input
                type="password"
                className='border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 w-full'
                placeholder='Password (min 8 characters)'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className='flex items-center gap-2 mt-4 self-start'>
              <input
                type="checkbox"
                id="sendNotification"
                className='rounded text-orange-500 focus:ring-orange-500'
                checked={sendNotification}
                onChange={(e) => setSendNotification(e.target.checked)}
              />
              <label htmlFor="sendNotification" className='text-xs text-gray-600 cursor-pointer'>
                Send notifications to my email
              </label>
            </div>

            <button
              onClick={handleSignUpClick}
              disabled={loading}
              className='w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full mt-6 transition duration-150 disabled:opacity-50 shadow'
            >
              {loading ? 'Creating account...' : 'Sign up'}
            </button>

            <p className='text-sm text-gray-600 mt-4'>
              Already have an account?{' '}
              <Link to="/login" className='text-orange-500 font-semibold hover:underline'>
                Log in
              </Link>
            </p>

            <div className='mt-6 w-full flex justify-center'>
              <GoogleLogin
                buttonText="Sign up with Google"
                onSuccess={handleLoginWithGoogle}
                onError={handleLoginFailure}
              />
            </div>

            <p className='text-xs text-gray-400 mt-6'>
              Go back to{' '}
              <Link to="/" className='text-orange-500 hover:underline'>
                home page
              </Link>
            </p>
          </div>
        </div>
        <div
          className='w-1/2 bg-no-repeat bg-cover hidden lg:block'
          style={{ backgroundImage: "url('/img/bg-register.png')" }}
        ></div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
