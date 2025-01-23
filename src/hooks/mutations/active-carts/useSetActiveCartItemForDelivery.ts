import { useMutation } from '@tanstack/react-query';
import { setItemForDelivery } from '@/api/carts/active/requests';
import { Request } from '@/api/carts/active/types/set-for-delivery';

const useSetActiveCartItemForDelivery = () =>
	useMutation({
		mutationKey: ['active-carts', 'set-item-for-delivery'],
		mutationFn: async (req: Request) =>
			(await setItemForDelivery(req)).data,
	});

export default useSetActiveCartItemForDelivery;
