import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '@/hooks/stores/useAuthStore';

const GuestGuard = () => {
	const { is } = useAuthStore();

	if (is.guest) return <Outlet />;
	return <Navigate to='/' />;
};

export default GuestGuard;
