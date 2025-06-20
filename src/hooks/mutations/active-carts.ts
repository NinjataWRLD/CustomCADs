import { useMutation } from '@tanstack/react-query';
import { Request as AddItem } from '@/api/carts/active/add-item';
import { Request as ChangeItemQuantity } from '@/api/carts/active/change-quantity';
import { Request as ToggleItemDelivery } from '@/api/carts/active/toggle-for-delivery';
import { Request as RemoveItem } from '@/api/carts/active/remove-item';
import { Request as Purchase } from '@/api/carts/active/purchase';
import { Request as PurchaseWithDelivery } from '@/api/carts/active/purchase-delivery';
import * as api from '@/api/carts/active';

export const keys = {
	base: ['active-carts'] as const,
	addItem: () => [...keys.base, 'add-item'] as const,
	toggleItemForDelivery: () =>
		[...keys.base, 'toggle-item-for-delivery'] as const,
	increaseItemQuantity: () =>
		[...keys.base, 'increase-item-quantity'] as const,
	decreaseItemQuantity: () =>
		[...keys.base, 'decrease-item-quantity'] as const,
	removeItem: () => [...keys.base, 'remove-item'] as const,
	purchase: () => [...keys.base, 'purchase'] as const,
	purchaseWithDelivery: () =>
		[...keys.base, 'purchase-with-delivery'] as const,
};

export const useAddActiveCartItem = () =>
	useMutation({
		mutationKey: keys.addItem(),
		mutationFn: async (params: AddItem) => (await api.addItem(params)).data,
	});

export const useToggleActiveCartItemForDelivery = () =>
	useMutation({
		mutationKey: keys.toggleItemForDelivery(),
		mutationFn: async (req: ToggleItemDelivery) =>
			(await api.toggleItemForDelivery(req)).data,
	});

export const useIncreaseActiveCartItemQuantity = () =>
	useMutation({
		mutationKey: keys.increaseItemQuantity(),
		mutationFn: async (params: ChangeItemQuantity) =>
			(await api.increaseItemQuantity(params)).data,
	});

export const useDecreaseActiveCartItemQuantity = () =>
	useMutation({
		mutationKey: keys.decreaseItemQuantity(),
		mutationFn: async (params: ChangeItemQuantity) =>
			(await api.decreaseItemQuantity(params)).data,
	});

export const useRemoveActiveCartItem = () =>
	useMutation({
		mutationKey: keys.removeItem(),
		mutationFn: async (params: RemoveItem) =>
			(await api.removeItem(params)).data,
	});

export const usePurchaseActiveCart = () =>
	useMutation({
		mutationKey: keys.purchase(),
		mutationFn: async (req: Purchase) => (await api.purchase(req)).data,
	});

export const usePurchaseActiveCartWithDelivery = () =>
	useMutation({
		mutationKey: keys.purchaseWithDelivery(),
		mutationFn: async (req: PurchaseWithDelivery) =>
			(await api.purchaseWithDelivery(req)).data,
	});
