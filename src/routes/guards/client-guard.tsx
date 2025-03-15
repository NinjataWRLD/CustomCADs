import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/hooks/stores/useAuthStore';

const ClientGuard = () => {
	const { is } = useAuthStore();

	if (is.client) return <Outlet />;
	return <Navigate to='/' />;
};

export default ClientGuard;
