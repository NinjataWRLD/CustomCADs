import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '@/hooks/stores/useAuthStore';

const CreatorGuard = () => {
	const { is } = useAuthStore();

	if (is.creator) return <Outlet />;
	return <Navigate to='/' />;
};

export default CreatorGuard;
