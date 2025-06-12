import { useQuery } from '@tanstack/react-query';
import { Request as All } from '@/api/carts/purchased/all';
import { Request as Single } from '@/api/carts/purchased/single';
import { Request as Download } from '@/api/carts/purchased/download';
import {
	all,
	download,
	paymentStatuses,
	single,
	sortings,
	stats,
} from '@/api/carts/purchased';

export const useGetPurchasedCarts = (params: All, enabled?: boolean) =>
	useQuery({
		queryKey: ['purchased-carts', 'all', params],
		queryFn: async () => (await all(params)).data,
		enabled,
	});

export const useGetPurchasedCart = (params: Single, enabled?: boolean) =>
	useQuery({
		queryKey: ['purchased-carts', 'single', params],
		queryFn: async () => (await single(params)).data,
		enabled,
	});

export const useGetPurchasedCartsSortings = (enabled?: boolean) =>
	useQuery({
		queryKey: ['purchased-carts', 'sortings'],
		queryFn: async () => (await sortings()).data,
		enabled,
	});

export const useGetPurchasedCartsPaymentStatuses = (enabled?: boolean) =>
	useQuery({
		queryKey: ['purchased-carts', 'payment-statuses'],
		queryFn: async () => (await paymentStatuses()).data,
		enabled,
	});

export const useGetPurchasedCartsStats = (enabled?: boolean) =>
	useQuery({
		queryKey: ['purchased-carts', 'stats'],
		queryFn: async () => (await stats()).data,
		enabled,
	});

export const useDownloadPurchasedCartItemCad = (
	params: Download,
	enabled?: boolean,
) =>
	useQuery({
		queryKey: ['purchased-carts', 'download', params],
		queryFn: async () => (await download(params)).data,
		enabled,
	});
