import { useMutation } from '@tanstack/react-query';
import { Request as Status } from '@/api/customs/customs/designer/status';
import { Request as Finish } from '@/api/customs/customs/designer/finish';
import {
	accept,
	begin,
	cancel,
	finish,
	report,
} from '@/api/customs/customs/designer';

export const useAcceptCustom = () =>
	useMutation({
		mutationKey: ['customs', 'designer', 'accept'],
		mutationFn: async (params: Status) => (await accept(params)).data,
	});

export const useBeginCustom = () =>
	useMutation({
		mutationKey: ['customs', 'designer', 'begin'],
		mutationFn: async (params: Status) => (await begin(params)).data,
	});

export const useCancelCustom = () =>
	useMutation({
		mutationKey: ['customs', 'designer', 'cancel'],
		mutationFn: async (params: Status) => (await cancel(params)).data,
	});

export const useReportCustom = () =>
	useMutation({
		mutationKey: ['customs', 'designer', 'report'],
		mutationFn: async (params: Status) => (await report(params)).data,
	});

export const useFinishCustom = () =>
	useMutation({
		mutationKey: ['customs', 'designer', 'finish'],
		mutationFn: async (params: Finish) => (await finish(params)).data,
	});
