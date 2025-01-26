import { useMutation } from '@tanstack/react-query';
import { removeItem } from '@/api/carts/active';
import { Request } from '@/api/carts/active/resources/remove-item';

const useRemoveActiveCartItem = () =>
	useMutation({
		mutationKey: ['active-carts', 'remove-item'],
		mutationFn: async (req: Request) => (await removeItem(req)).data,
	});

export default useRemoveActiveCartItem;
