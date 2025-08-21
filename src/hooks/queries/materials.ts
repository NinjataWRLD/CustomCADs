import { useQuery } from '@tanstack/react-query';
import { Request as Single } from '@/api/printing/materials/single';
import { Request as Download } from '@/api/printing/materials/download';
import { Request as Upload } from '@/api/printing/materials/upload';
import { Request as Replace } from '@/api/printing/materials/replace';
import * as api from '@/api/printing/materials';

export const keys = {
	base: ['materials'] as const,
	all: () => [...keys.base, 'all'] as const,
	single: (params: Single) => [...keys.base, 'single', params] as const,
	downloadTexture: (params: Download) =>
		[...keys.base, 'download-texture', params] as const,
	uploadTexture: (params: Upload) =>
		[...keys.base, 'upload-texture', params] as const,
	replaceTexture: (params: Replace) =>
		[...keys.base, 'replace-texure', params] as const,
};

export const useGetMaterials = (enabled?: boolean) =>
	useQuery({
		queryKey: keys.all(),
		queryFn: async () => (await api.all()).data,
		enabled,
	});

export const useGetMaterial = (params: Single, enabled?: boolean) =>
	useQuery({
		queryKey: keys.single(params),
		queryFn: async () => (await api.single(params)).data,
		enabled: enabled,
	});

export const useDownloadMaterialTexture = (
	params: Download,
	enabled?: boolean,
) =>
	useQuery({
		queryKey: keys.downloadTexture(params),
		queryFn: async () => (await api.downloadTexture(params)).data,
		enabled,
	});

export const useUploadMaterialTexture = (params: Upload, enabled?: boolean) =>
	useQuery({
		queryKey: keys.uploadTexture(params),
		queryFn: async () => (await api.uploadTexture(params)).data,
		enabled,
	});

export const useReplaceMaterialTexture = (params: Replace, enabled?: boolean) =>
	useQuery({
		queryKey: keys.replaceTexture(params),
		queryFn: async () => (await api.replaceTexture(params)).data,
		enabled,
	});
