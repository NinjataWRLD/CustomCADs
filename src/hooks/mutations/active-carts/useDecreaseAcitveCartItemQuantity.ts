import { useMutation } from '@tanstack/react-query';
import { decreaseItemQuantity } from '@/api/carts/active';
import { Request } from '@/api/carts/active/resources/change-quantity';

const useDecreaseAcitveCartItemQuantity = () =>
	useMutation({
		mutationKey: ['active-carts', 'decrease-item-quantity'],
		mutationFn: async (req: Request) =>
			(await decreaseItemQuantity(req)).data,
	});

export default useDecreaseAcitveCartItemQuantity;
