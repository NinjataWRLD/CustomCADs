import { useMutation } from '@tanstack/react-query';
import { toggleItemForDelivery } from '@/api/carts/active';
import { Request } from '@/api/carts/active/resources/toggle-for-delivery';

const useToggleActiveCartItemForDelivery = () =>
	useMutation({
		mutationKey: ['active-carts', 'toggle-item-for-delivery'],
		mutationFn: async (req: Request) =>
			(await toggleItemForDelivery(req)).data,
	});

export default useToggleActiveCartItemForDelivery;
