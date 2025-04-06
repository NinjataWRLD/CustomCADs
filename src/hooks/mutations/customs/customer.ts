import { useMutation } from '@tanstack/react-query';
import { Request as Create } from '@/api/customs/customs/customer/create';
import { Request as Edit } from '@/api/customs/customs/customer/edit';
import { Request as Purchase } from '@/api/customs/customs/customer/purchase';
import { Request as PurchaseWithDelivery } from '@/api/customs/customs/customer/purchase-delivery';
import { Request as Delete } from '@/api/customs/customs/customer/delete';
import {
	edit,
	create,
	delete_,
	purchase,
	purchaseWithDelivery,
} from '@/api/customs/customs/customer';

export const useCreateCustom = () =>
	useMutation({
		mutationKey: ['customs', 'customer', 'create'],
		mutationFn: async (params: Create) => (await create(params)).data,
	});

export const useEditCustom = () =>
	useMutation({
		mutationKey: ['customs', 'customer', 'edit'],
		mutationFn: async (params: Edit) => (await edit(params)).data,
	});

export const usePurchaseCustom = () =>
	useMutation({
		mutationKey: ['customs', 'customer', 'purchase'],
		mutationFn: async (params: Purchase) => (await purchase(params)).data,
	});

export const usePurchaseCustomWithDelivery = () =>
	useMutation({
		mutationKey: ['customs', 'customer', 'purchase-with-delivery'],
		mutationFn: async (params: PurchaseWithDelivery) =>
			(await purchaseWithDelivery(params)).data,
	});

export const useDeleteCustom = () =>
	useMutation({
		mutationKey: ['customs', 'customer', 'delete'],
		mutationFn: async (params: Delete) => (await delete_(params)).data,
	});
