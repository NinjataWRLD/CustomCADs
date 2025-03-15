import { useMutation } from '@tanstack/react-query';
import { Request as Report } from '@/api/catalog/products/designer/resources/report';
import { Request as Validate } from '@/api/catalog/products/designer/resources/validate';
import { report, validate } from '@/api/catalog/products/designer';

export const useReportProduct = () =>
	useMutation({
		mutationKey: ['products', 'desinger', 'report'],
		mutationFn: async (params: Report) => (await report(params)).data,
	});

export const useValidateProduct = () =>
	useMutation({
		mutationKey: ['products', 'desinger', 'validate'],
		mutationFn: async (params: Validate) => (await validate(params)).data,
	});
