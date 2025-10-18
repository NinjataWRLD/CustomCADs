import { axios, config } from '@/api/axios';
import { MaterialResponse } from '@/api/printing/common';
import * as allResources from './all';
import * as singleResources from './single';
import * as createResources from './create';
import * as editResources from './edit';
import * as deleteResources from './delete';

export const all = () => axios.get<MaterialResponse[]>(allResources.url());

export const single = (req: singleResources.Request) =>
	axios.get<MaterialResponse>(singleResources.url(req));

export const create = (req: createResources.Request) =>
	axios.post<MaterialResponse>(
		createResources.url(),
		req,
		config({ idempotencyKey: req.idempotencyKey }),
	);

export const edit = (req: editResources.Request) =>
	axios.put(editResources.url(), req);

export const delete_ = (req: deleteResources.Request) =>
	axios.delete(editResources.url(), config({ data: req }));
