import useAuthz from '@/hooks/queries/identity/useAuthz';
import { login } from '@/stores/auth-store';

const useUpdateAuthz = () => {
	const { refetch } = useAuthz();
	const updateAuthz = async () => {
		const { data: role } = await refetch();

		if (role) {
			login(role);
		}
	};

	return updateAuthz;
};

export default useUpdateAuthz;
