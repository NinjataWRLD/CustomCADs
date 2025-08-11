import { axios, config } from '@/api/axios';
import { MaterialResponse } from '@/api/printing/common';
import * as allResources from './all';
import * as singleResources from './single';
import * as downloadResources from './download';
import * as createResources from './create';
import * as uploadResources from './upload';
import * as replaceResources from './replace';
import * as editResources from './edit';
import * as deleteResources from './delete';

export const all = () => axios.get<MaterialResponse[]>(allResources.url());

export const single = (req: singleResources.Request) =>
	axios.get<MaterialResponse>(singleResources.url(req));

export const downloadTexture = (req: downloadResources.Request) =>
	axios.post<downloadResources.Response>(downloadResources.url(), req);

export const create = (req: createResources.Request) =>
	axios.post<MaterialResponse>(
		createResources.url(),
		req,
		config({ idempotencyKey: req.idempotencyKey }),
	);

export const uploadTexture = (req: uploadResources.Request) =>
	axios.post<uploadResources.Response>(uploadResources.url(), req);

export const replaceTexture = (req: replaceResources.Request) =>
	axios.post<replaceResources.Response>(replaceResources.url(), req);

export const edit = (req: editResources.Request) =>
	axios.put(editResources.url(), req);

export const delete_ = (req: deleteResources.Request) =>
	axios.delete(editResources.url(), config({ data: req }));
