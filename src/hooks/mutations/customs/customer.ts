import { useMutation } from '@tanstack/react-query';
import { Request as Create } from '@/api/customs/customs/customer/create';
import { Request as Edit } from '@/api/customs/customs/customer/edit';
import { Request as Purchase } from '@/api/customs/customs/customer/purchase';
import { Request as PurchaseWithDelivery } from '@/api/customs/customs/customer/purchase-delivery';
import { Request as Delete } from '@/api/customs/customs/customer/delete';
import * as api from '@/api/customs/customs/customer';

export const keys = {
	base: ['customs', 'customer'] as const,
	create: () => [...keys.base, 'create'] as const,
	edit: () => [...keys.base, 'edit'] as const,
	purchase: () => [...keys.base, 'purchase'] as const,
	purchaseWithDelivery: () =>
		[...keys.base, 'purchase-with-delivery'] as const,
	delete: () => [...keys.base, 'delete'] as const,
};

export const useCreateCustom = () =>
	useMutation({
		mutationKey: keys.create(),
		mutationFn: async (params: Create) => (await api.create(params)).data,
	});

export const useEditCustom = () =>
	useMutation({
		mutationKey: keys.edit(),
		mutationFn: async (params: Edit) => (await api.edit(params)).data,
	});

export const usePurchaseCustom = () =>
	useMutation({
		mutationKey: keys.purchase(),
		mutationFn: async (params: Purchase) =>
			(await api.purchase(params)).data,
	});

export const usePurchaseCustomWithDelivery = () =>
	useMutation({
		mutationKey: keys.purchaseWithDelivery(),
		mutationFn: async (params: PurchaseWithDelivery) =>
			(await api.purchaseWithDelivery(params)).data,
	});

export const useDeleteCustom = () =>
	useMutation({
		mutationKey: keys.delete(),
		mutationFn: async (params: Delete) => (await api.delete_(params)).data,
	});
