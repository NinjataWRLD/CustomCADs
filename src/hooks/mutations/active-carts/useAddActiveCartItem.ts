import { useMutation } from '@tanstack/react-query';
import { addItem } from '@/api/carts/active';
import { Request } from '@/api/carts/active/resources/add-item';

const useAddActiveCartItem = () =>
	useMutation({
		mutationKey: ['active-carts', 'add-item'],
		mutationFn: async (req: Request) => (await addItem(req)).data,
	});

export default useAddActiveCartItem;
