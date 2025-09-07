import { useAuth } from '../Context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole, adminOnly = false }) => {
  const { isAuthenticated, user, isAdmin } = useAuth();

  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  if (adminOnly && !isAdmin()) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && !user?.role === requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
