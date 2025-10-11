import { axios } from '@/api/axios';
import { Result } from '@/api/common/result';
import { CadResponse } from '../common';
import * as presignedUrlsResources from '../presigned';
import * as allResources from './all';
import * as singleResources from './single';
import * as createResources from './create';
import * as editResources from './edit';
import * as coordsResources from './coords';

export const all = (req: allResources.Request) =>
	axios.get<Result<CadResponse>>(allResources.url(req));

export const single = (req: singleResources.Request) =>
	axios.get<CadResponse>(singleResources.url(req));

export const downloadUrl = (req: presignedUrlsResources.DownloadRequest) =>
	axios.post<presignedUrlsResources.DownloadResponse>(
		presignedUrlsResources.url('cad', 'download'),
		req,
	);

export const uploadUrl = (req: presignedUrlsResources.UploadRequest) =>
	axios.post<presignedUrlsResources.UploadResponse>(
		presignedUrlsResources.url('cad', 'upload'),
		req,
	);

export const replaceUrl = (req: presignedUrlsResources.ReplaceRequest) =>
	axios.post<presignedUrlsResources.ReplaceResponse>(
		presignedUrlsResources.url('cad', 'replace'),
		req,
	);

export const create = (req: createResources.Request) =>
	axios.post<CadResponse>(createResources.url(), req);

export const edit = (req: editResources.Request) =>
	axios.put<CadResponse>(editResources.url(), req);

export const setCoords = (req: coordsResources.Request) =>
	axios.patch<CadResponse>(coordsResources.url(), req);
