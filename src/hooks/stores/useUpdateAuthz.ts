import { useAuthz } from '@/hooks/queries/identity';
import { login } from '@/stores/auth-store';

export const useUpdateAuthz = () => {
	const { refetch } = useAuthz();
	const updateAuthz = async () => {
		const { data: role } = await refetch();

		if (role) {
			login(role);
		}
	};

	return updateAuthz;
};
