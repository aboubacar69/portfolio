import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '@/lib/adminApi';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!isLoggedIn()) {
        return <Navigate to="/admin/login" replace />;
    }
    return <>{children}</>;
};

export default ProtectedRoute;
