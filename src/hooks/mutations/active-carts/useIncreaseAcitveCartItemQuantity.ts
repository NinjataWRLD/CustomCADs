import { useMutation } from '@tanstack/react-query';
import { increaseItemQuantity } from '@/api/carts/active/requests';
import { Request } from '@/api/carts/active/types/increase-quantity';

const useIncreaseAcitveCartItemQuantity = () =>
	useMutation({
		mutationKey: ['active-carts', 'increase-item-quantity'],
		mutationFn: async (req: Request) =>
			(await increaseItemQuantity(req)).data,
	});

export default useIncreaseAcitveCartItemQuantity;
