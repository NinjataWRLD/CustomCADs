import { useMutation } from '@tanstack/react-query';
import { purchase } from '@/api/carts/active/requests';
import { Request } from '@/api/carts/active/types/purchase';

const useAddActiveCartItem = () =>
	useMutation({
		mutationKey: ['active-carts', 'purchase'],
		mutationFn: async (req: Request) => (await purchase(req)).data,
	});

export default useAddActiveCartItem;
