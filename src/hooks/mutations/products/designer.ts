import { useMutation } from '@tanstack/react-query';
import { Request as Report } from '@/api/catalog/products/designer/report';
import { Request as Validate } from '@/api/catalog/products/designer/validate';
import * as api from '@/api/catalog/products/designer';

export const keys = {
	base: ['products', 'designer'] as const,
	report: () => [...keys.base, 'report'] as const,
	validate: () => [...keys.base, 'validate'] as const,
};

export const useReportProduct = () =>
	useMutation({
		mutationKey: keys.report(),
		mutationFn: async (params: Report) => (await api.report(params)).data,
	});

export const useValidateProduct = () =>
	useMutation({
		mutationKey: keys.validate(),
		mutationFn: async (params: Validate) =>
			(await api.validate(params)).data,
	});
