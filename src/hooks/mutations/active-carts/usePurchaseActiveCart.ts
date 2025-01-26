import { useMutation } from '@tanstack/react-query';
import { purchase } from '@/api/carts/active';
import { Request } from '@/api/carts/active/resources/purchase';

const usePurchaseActiveCart = () =>
	useMutation({
		mutationKey: ['active-carts', 'purchase'],
		mutationFn: async (req: Request) => (await purchase(req)).data,
	});

export default usePurchaseActiveCart;
