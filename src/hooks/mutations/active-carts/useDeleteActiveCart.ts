import { useMutation } from '@tanstack/react-query';
import { delete_ } from '@/api/carts/active';

const useDeleteActiveCart = () =>
	useMutation({
		mutationKey: ['active-carts', 'delete'],
		mutationFn: async () => (await delete_()).data,
	});

export default useDeleteActiveCart;
