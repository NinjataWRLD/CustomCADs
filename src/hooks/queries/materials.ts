import { useQuery } from '@tanstack/react-query';
import { Request as Single } from '@/api/customizations/materials/single';
import { Request as Download } from '@/api/customizations/materials/download';
import { Request as Upload } from '@/api/customizations/materials/upload';
import { Request as Replace } from '@/api/customizations/materials/replace';
import {
	all,
	downloadTexture,
	replaceTexture,
	single,
	uploadTexture,
} from '@/api/customizations/materials';

export const useGetMaterials = (enabled?: boolean) =>
	useQuery({
		queryKey: ['materials', 'all'],
		queryFn: async () => (await all()).data,
		enabled,
	});

export const useGetMaterial = (params: Single, enabled?: boolean) =>
	useQuery({
		queryKey: ['materials', 'single', params],
		queryFn: async () => (await single(params)).data,
		enabled: enabled,
	});

export const useDownloadMaterialTexture = (
	params: Download,
	enabled?: boolean,
) =>
	useQuery({
		queryKey: ['materials', 'download-texture', params],
		queryFn: async () => (await downloadTexture(params)).data,
		enabled,
	});

export const useUploadMaterialTexture = (params: Upload, enabled?: boolean) =>
	useQuery({
		queryKey: ['materials', 'upload-texture', params],
		queryFn: async () => (await uploadTexture(params)).data,
		enabled,
	});

export const useReplaceMaterialTexture = (params: Replace, enabled?: boolean) =>
	useQuery({
		queryKey: ['materials', 'replace-texture', params],
		queryFn: async () => (await replaceTexture(params)).data,
		enabled,
	});
