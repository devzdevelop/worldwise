import { useEffect } from 'react';
import { useAuthContext } from '../context/FakeAuthContext';
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
}
