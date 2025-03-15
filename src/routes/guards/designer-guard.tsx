import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/hooks/stores/useAuthStore';

const DesignerGuard = () => {
	const { is } = useAuthStore();

	if (is.designer) return <Outlet />;
	return <Navigate to='/' />;
};

export default DesignerGuard;
