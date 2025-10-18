import { useMutation } from '@tanstack/react-query';
import { Request as Remove } from '@/api/catalog/products/admin/remove';
import * as api from '@/api/catalog/products/admin';

export const keys = {
	base: ['products', 'admin'] as const,
	remove: () => [...keys.base, 'remove'] as const,
};

export const useRemoveProduct = () =>
	useMutation({
		mutationKey: keys.remove(),
		mutationFn: async (params: Remove) => (await api.remove(params)).data,
	});
