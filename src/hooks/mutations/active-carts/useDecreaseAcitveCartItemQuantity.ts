import { useMutation } from '@tanstack/react-query';
import { decreaseItemQuantity } from '@/api/carts/active/requests';
import { Request } from '@/api/carts/active/types/decrease-quantity';

const useDecreaseAcitveCartItemQuantity = () =>
	useMutation({
		mutationKey: ['active-carts', 'decrease-item-quantity'],
		mutationFn: async (req: Request) =>
			(await decreaseItemQuantity(req)).data,
	});

export default useDecreaseAcitveCartItemQuantity;
