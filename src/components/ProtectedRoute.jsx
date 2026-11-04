import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import NotAllow from './NotAllow';

/**
 * Route protection component for authenticated and role-based routes.
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to render if authorized.
 * @param {Array<number>} [props.requiredRoles] - Allowed roles (e.g. [1, 2, 3] for authors/admins).
 * @param {string} [props.redirectTo="/login"] - Path to redirect unauthenticated users.
 */
export default function ProtectedRoute({ children, requiredRoles, redirectTo = '/login' }) {
  const { user, token } = useSelector((state) => state.me_authorsReducer);
  const storedToken = localStorage.getItem('token');
  const location = useLocation();

  const activeToken = token || storedToken;

  // Unauthenticated user
  if (!activeToken) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // If roles are specified and user is still loading with a valid token
  if (requiredRoles && requiredRoles.length > 0) {
    if (!user) {
      return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Verifying session...</p>
        </div>
      );
    }

    if (!requiredRoles.includes(user.role)) {
      return <NotAllow />;
    }
  }

  return children;
}
