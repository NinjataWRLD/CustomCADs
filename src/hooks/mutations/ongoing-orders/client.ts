import { useMutation } from '@tanstack/react-query';
import { Request as Create } from '@/api/orders/ongoing/client/resources/create';
import { Request as Edit } from '@/api/orders/ongoing/client/resources/edit';
import { Request as Purchase } from '@/api/orders/ongoing/client/resources/purchase';
import { Request as PurchaseWithDelivery } from '@/api/orders/ongoing/client/resources/purchase-delivery';
import { Request as Delete } from '@/api/orders/ongoing/client/resources/delete';
import {
	edit,
	create,
	delete_,
	purchase,
	purchaseWithDelivery,
} from '@/api/orders/ongoing/client';

export const useCreateOngoingOrder = () =>
	useMutation({
		mutationKey: ['ongoing-orders', 'client', 'create'],
		mutationFn: async (params: Create) => (await create(params)).data,
	});

export const useEditOngoingOrder = () =>
	useMutation({
		mutationKey: ['ongoing-orders', 'client', 'edit'],
		mutationFn: async (params: Edit) => (await edit(params)).data,
	});

export const usePurchaseOngoingOrder = () =>
	useMutation({
		mutationKey: ['ongoing-orders', 'client', 'purchase'],
		mutationFn: async (params: Purchase) => (await purchase(params)).data,
	});

export const usePurchaseOngoingOrderWithDelivery = () =>
	useMutation({
		mutationKey: ['ongoing-orders', 'client', 'purchase-with-delivery'],
		mutationFn: async (params: PurchaseWithDelivery) =>
			(await purchaseWithDelivery(params)).data,
	});

export const useDeleteOngoingOrder = () =>
	useMutation({
		mutationKey: ['ongoing-orders', 'client', 'delete'],
		mutationFn: async (params: Delete) => (await delete_(params)).data,
	});
