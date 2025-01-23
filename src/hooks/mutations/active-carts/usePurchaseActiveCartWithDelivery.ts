import { useMutation } from '@tanstack/react-query';
import { purchaseWithDelivery } from '@/api/carts/active/requests';
import { Request } from '@/api/carts/active/types/purchase-delivery';

const useAddActiveCartItemWithDelivery = () =>
	useMutation({
		mutationKey: ['active-carts', 'purchase-delivery'],
		mutationFn: async (req: Request) =>
			(await purchaseWithDelivery(req)).data,
	});

export default useAddActiveCartItemWithDelivery;
