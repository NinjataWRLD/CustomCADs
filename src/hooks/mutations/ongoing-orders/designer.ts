import { useMutation } from '@tanstack/react-query';
import { Request as Status } from '@/api/orders/ongoing/designer/resources/status';
import { Request as Finish } from '@/api/orders/ongoing/designer/resources/finish';
import {
	accept,
	begin,
	cancel,
	finish,
	report,
} from '@/api/orders/ongoing/designer';

export const useAcceptOngoingOrder = () =>
	useMutation({
		mutationKey: ['ongoing-orders', 'designer', 'accept'],
		mutationFn: async (params: Status) => (await accept(params)).data,
	});

export const useBeginOngoingOrder = () =>
	useMutation({
		mutationKey: ['ongoing-orders', 'designer', 'begin'],
		mutationFn: async (params: Status) => (await begin(params)).data,
	});

export const useCancelOngoingOrder = () =>
	useMutation({
		mutationKey: ['ongoing-orders', 'designer', 'cancel'],
		mutationFn: async (params: Status) => (await cancel(params)).data,
	});

export const useReportOngoingOrder = () =>
	useMutation({
		mutationKey: ['ongoing-orders', 'designer', 'report'],
		mutationFn: async (params: Status) => (await report(params)).data,
	});

export const useFinishOngoingOrder = () =>
	useMutation({
		mutationKey: ['ongoing-orders', 'designer', 'finish'],
		mutationFn: async (params: Finish) => (await finish(params)).data,
	});
