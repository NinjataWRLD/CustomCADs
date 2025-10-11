import { useMutation } from '@tanstack/react-query';
import {
	DownloadRequest,
	UploadRequest,
	ReplaceRequest,
} from '@/api/files/presigned';
import { Request as Create } from '@/api/files/cads/create';
import { Request as Edit } from '@/api/files/cads/edit';
import { Request as Coords } from '@/api/files/cads/coords';
import * as api from '@/api/files/cads';

export const keys = {
	base: ['cads'] as const,
	create: () => [...keys.base, 'create'] as const,
	edit: () => [...keys.base, 'edit'] as const,
	coords: () => [...keys.base, 'coords'] as const,
	upload: () => [...keys.base, 'upload'] as const,
	replace: () => [...keys.base, 'replace'] as const,
	download: () => [...keys.base, 'download'] as const,
};

export const useCreateCad = () =>
	useMutation({
		mutationKey: keys.create(),
		mutationFn: async (params: Create) => (await api.create(params)).data,
	});

export const useEditCad = () =>
	useMutation({
		mutationKey: keys.edit(),
		mutationFn: async (params: Edit) => (await api.edit(params)).data,
	});

export const useSetCadCoords = () =>
	useMutation({
		mutationKey: keys.coords(),
		mutationFn: async (params: Coords) =>
			(await api.setCoords(params)).data,
	});

export const useDownloadCadUrl = () =>
	useMutation({
		mutationKey: keys.download(),
		mutationFn: async (params: DownloadRequest) =>
			(await api.downloadUrl(params)).data,
	});

export const useUploadCadUrl = () =>
	useMutation({
		mutationKey: keys.upload(),
		mutationFn: async (params: UploadRequest) =>
			(await api.uploadUrl(params)).data,
	});

export const useReplaceCadUrl = () =>
	useMutation({
		mutationKey: keys.replace(),
		mutationFn: async (params: ReplaceRequest) =>
			(await api.replaceUrl(params)).data,
	});
