import { axios } from '@/api/axios';
import { ImageResponse } from '../common';
import * as presignedUrlsResources from '../presigned';
import * as singleResources from './single';
import * as createResources from './create';
import * as editResources from './edit';

export const single = (req: singleResources.Request) =>
	axios.get<ImageResponse>(singleResources.url(req));

export const downloadUrl = (req: presignedUrlsResources.DownloadRequest) =>
	axios.post<presignedUrlsResources.DownloadResponse>(
		presignedUrlsResources.url('image', 'download'),
		req,
	);

export const uploadUrl = (req: presignedUrlsResources.UploadRequest) =>
	axios.post<presignedUrlsResources.UploadResponse>(
		presignedUrlsResources.url('image', 'upload'),
		req,
	);

export const replaceUrl = (req: presignedUrlsResources.ReplaceRequest) =>
	axios.post<presignedUrlsResources.ReplaceResponse>(
		presignedUrlsResources.url('image', 'replace'),
		req,
	);

export const create = (req: createResources.Request) =>
	axios.post<ImageResponse>(createResources.url(), req);

export const edit = (req: editResources.Request) =>
	axios.put<ImageResponse>(editResources.url(), req);
