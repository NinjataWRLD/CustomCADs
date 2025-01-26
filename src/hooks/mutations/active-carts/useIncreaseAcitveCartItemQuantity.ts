import { useMutation } from '@tanstack/react-query';
import { increaseItemQuantity } from '@/api/carts/active';
import { Request } from '@/api/carts/active/resources/change-quantity';

const useIncreaseAcitveCartItemQuantity = () =>
	useMutation({
		mutationKey: ['active-carts', 'increase-item-quantity'],
		mutationFn: async (req: Request) =>
			(await increaseItemQuantity(req)).data,
	});

export default useIncreaseAcitveCartItemQuantity;
