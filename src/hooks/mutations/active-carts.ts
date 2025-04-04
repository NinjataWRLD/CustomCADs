import { useMutation } from '@tanstack/react-query';
import { Request as AddItem } from '@/api/carts/active/resources/add-item';
import { Request as ChangeItemQuantity } from '@/api/carts/active/resources/change-quantity';
import { Request as ToggleItemDelivery } from '@/api/carts/active/resources/toggle-for-delivery';
import { Request as RemoveItem } from '@/api/carts/active/resources/remove-item';
import { Request as Purchase } from '@/api/carts/active/resources/purchase';
import { Request as PurchaseWithDelivery } from '@/api/carts/active/resources/purchase-delivery';
import {
	addItem,
	decreaseItemQuantity,
	increaseItemQuantity,
	purchase,
	purchaseWithDelivery,
	removeItem,
	toggleItemForDelivery,
} from '@/api/carts/active';

export const useAddActiveCartItem = () =>
	useMutation({
		mutationKey: ['active-carts', 'add-item'],
		mutationFn: async (params: AddItem) => (await addItem(params)).data,
	});

export const useToggleActiveCartItemForDelivery = () =>
	useMutation({
		mutationKey: ['active-carts', 'toggle-item-for-delivery'],
		mutationFn: async (req: ToggleItemDelivery) =>
			(await toggleItemForDelivery(req)).data,
	});

export const useIncreaseActiveCartItemQuantity = () =>
	useMutation({
		mutationKey: ['active-carts', 'increase-item-quantity'],
		mutationFn: async (params: ChangeItemQuantity) =>
			(await increaseItemQuantity(params)).data,
	});

export const useDecreaseActiveCartItemQuantity = () =>
	useMutation({
		mutationKey: ['active-carts', 'decrease-item-quantity'],
		mutationFn: async (params: ChangeItemQuantity) =>
			(await decreaseItemQuantity(params)).data,
	});

export const useRemoveActiveCartItem = () =>
	useMutation({
		mutationKey: ['active-carts', 'remove-item'],
		mutationFn: async (params: RemoveItem) =>
			(await removeItem(params)).data,
	});

export const usePurchaseActiveCart = () =>
	useMutation({
		mutationKey: ['active-carts', 'purchase'],
		mutationFn: async (req: Purchase) => (await purchase(req)).data,
	});

export const usePurchaseActiveCartWithDelivery = () =>
	useMutation({
		mutationKey: ['active-carts', 'purchase-with-delivery'],
		mutationFn: async (req: PurchaseWithDelivery) =>
			(await purchaseWithDelivery(req)).data,
	});
