import { useMutation } from '@tanstack/react-query';
import { edit } from '@/api/orders/ongoing/client/requests';
import { Request } from '@/api/orders/ongoing/client/types/edit';

const useEditOngoingOrder = () =>
	useMutation({
		mutationKey: ['ongoing-orders', 'client', 'edit'],
		mutationFn: async (params: Request) => (await edit(params)).data,
	});

export default useEditOngoingOrder;
