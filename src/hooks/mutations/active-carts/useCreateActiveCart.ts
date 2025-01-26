import { useMutation } from '@tanstack/react-query';
import { create } from '@/api/carts/active';

const useCreateActiveCart = () =>
	useMutation({
		mutationKey: ['active-carts', 'create'],
		mutationFn: async () => (await create()).data,
	});

export default useCreateActiveCart;
