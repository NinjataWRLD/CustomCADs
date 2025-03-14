import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '@/hooks/stores/useAuthStore';

const ContributorGuard = () => {
	const { is } = useAuthStore();

	if (is.contributor) return <Outlet />;
	return <Navigate to='/' />;
};

export default ContributorGuard;
