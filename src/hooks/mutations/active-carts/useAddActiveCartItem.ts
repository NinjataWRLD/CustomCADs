import { useMutation } from '@tanstack/react-query';
import { addItem } from '@/api/carts/active/requests';
import { Request } from '@/api/carts/active/types/add-item';

const useAddActiveCartItem = () =>
	useMutation({
		mutationKey: ['active-carts', 'add-item'],
		mutationFn: async (req: Request) => (await addItem(req)).data,
	});

export default useAddActiveCartItem;
