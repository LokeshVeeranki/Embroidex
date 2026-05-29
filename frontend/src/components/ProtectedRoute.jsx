import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// For admin-only routes
export const AdminRoute = ({ children }) => {
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" />;
    if (user.role !== 'admin') return <Navigate to="/" />;
    return children;
};

// For logged-in user routes
export const PrivateRoute = ({ children }) => {
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" />;
    return children;
};