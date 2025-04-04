import { axios } from '@/api/axios';
import { MaterialResponse } from '@/api/customizations/common';
import * as allResources from './all';
import * as singleResources from './single';
import * as downloadResources from './download';
import * as createResources from './create';
import * as uploadResources from './upload';
import * as replaceResources from './replace';
import * as editResources from './edit';
import * as deleteResources from './delete';

export const all = () => axios.get<MaterialResponse[]>(allResources.url());

export const single = (request: singleResources.Request) =>
	axios.get<MaterialResponse>(singleResources.url(request));

export const downloadTexture = (request: downloadResources.Request) =>
	axios.post<downloadResources.Response>(downloadResources.url(), request);

export const create = (request: createResources.Request) =>
	axios.post<MaterialResponse>(createResources.url(), request);

export const uploadTexture = (request: uploadResources.Request) =>
	axios.post<uploadResources.Response>(uploadResources.url(), request);

export const replaceTexture = (request: replaceResources.Request) =>
	axios.post<replaceResources.Response>(replaceResources.url(), request);

export const edit = (request: editResources.Request) =>
	axios.put(editResources.url(), request);

export const delete_ = (request: deleteResources.Request) =>
	axios.delete(editResources.url(), { data: request });
