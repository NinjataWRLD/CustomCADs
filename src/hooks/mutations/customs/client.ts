import { useMutation } from '@tanstack/react-query';
import { Request as Create } from '@/api/customs/customs/client/create';
import { Request as Edit } from '@/api/customs/customs/client/edit';
import { Request as Purchase } from '@/api/customs/customs/client/purchase';
import { Request as PurchaseWithDelivery } from '@/api/customs/customs/client/purchase-delivery';
import { Request as Delete } from '@/api/customs/customs/client/delete';
import {
	edit,
	create,
	delete_,
	purchase,
	purchaseWithDelivery,
} from '@/api/customs/customs/client';

export const useCreateCustom = () =>
	useMutation({
		mutationKey: ['customs', 'client', 'create'],
		mutationFn: async (params: Create) => (await create(params)).data,
	});

export const useEditCustom = () =>
	useMutation({
		mutationKey: ['customs', 'client', 'edit'],
		mutationFn: async (params: Edit) => (await edit(params)).data,
	});

export const usePurchaseCustom = () =>
	useMutation({
		mutationKey: ['customs', 'client', 'purchase'],
		mutationFn: async (params: Purchase) => (await purchase(params)).data,
	});

export const usePurchaseCustomWithDelivery = () =>
	useMutation({
		mutationKey: ['customs', 'client', 'purchase-with-delivery'],
		mutationFn: async (params: PurchaseWithDelivery) =>
			(await purchaseWithDelivery(params)).data,
	});

export const useDeleteCustom = () =>
	useMutation({
		mutationKey: ['customs', 'client', 'delete'],
		mutationFn: async (params: Delete) => (await delete_(params)).data,
	});
