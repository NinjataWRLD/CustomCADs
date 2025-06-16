import { useMutation } from '@tanstack/react-query';
import { Request as Status } from '@/api/customs/customs/designer/status';
import { Request as Finish } from '@/api/customs/customs/designer/finish';
import * as api from '@/api/customs/customs/designer';

export const keys = {
	base: ['customs', 'designer'] as const,
	accept: () => [...keys.base, 'accept'] as const,
	begin: () => [...keys.base, 'begin'] as const,
	cancel: () => [...keys.base, 'cancel'] as const,
	report: () => [...keys.base, 'report'] as const,
	finish: () => [...keys.base, 'finish'] as const,
};

export const useAcceptCustom = () =>
	useMutation({
		mutationKey: keys.accept(),
		mutationFn: async (params: Status) => (await api.accept(params)).data,
	});

export const useBeginCustom = () =>
	useMutation({
		mutationKey: keys.begin(),
		mutationFn: async (params: Status) => (await api.begin(params)).data,
	});

export const useCancelCustom = () =>
	useMutation({
		mutationKey: keys.cancel(),
		mutationFn: async (params: Status) => (await api.cancel(params)).data,
	});

export const useReportCustom = () =>
	useMutation({
		mutationKey: keys.report(),
		mutationFn: async (params: Status) => (await api.report(params)).data,
	});

export const useFinishCustom = () =>
	useMutation({
		mutationKey: keys.finish(),
		mutationFn: async (params: Finish) => (await api.finish(params)).data,
	});
