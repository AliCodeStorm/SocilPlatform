import { useAuth } from '@/context/AuthProvider';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
