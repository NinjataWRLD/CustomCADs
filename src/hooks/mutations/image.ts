import { useMutation } from '@tanstack/react-query';
import { UploadRequest, ReplaceRequest } from '@/api/files/presigned';
import { Request as Create } from '@/api/files/images/create';
import { Request as Edit } from '@/api/files/images/edit';
import * as api from '@/api/files/images';

export const keys = {
	base: ['images'] as const,
	create: () => [...keys.base, 'create'] as const,
	edit: () => [...keys.base, 'edit'] as const,
	coords: () => [...keys.base, 'coords'] as const,
	upload: () => [...keys.base, 'upload'] as const,
	replace: () => [...keys.base, 'replace'] as const,
};

export const useCreateImage = () =>
	useMutation({
		mutationKey: keys.create(),
		mutationFn: async (params: Create) => (await api.create(params)).data,
	});

export const useEditImage = () =>
	useMutation({
		mutationKey: keys.edit(),
		mutationFn: async (params: Edit) => (await api.edit(params)).data,
	});

export const useUploadImageUrl = () =>
	useMutation({
		mutationKey: keys.upload(),
		mutationFn: async (params: UploadRequest) =>
			(await api.uploadUrl(params)).data,
	});

export const useReplaceImageUrl = () =>
	useMutation({
		mutationKey: keys.replace(),
		mutationFn: async (params: ReplaceRequest) =>
			(await api.replaceUrl(params)).data,
	});
