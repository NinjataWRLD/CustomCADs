import { axios, config } from '@/api/axios';
import { RoleResponse } from '../common';
import * as allResources from './all';
import * as singleResources from './single';
import * as createResources from './create';
import * as deleteResources from './delete';

export const all = async () =>
	await axios.get<RoleResponse[]>(allResources.url());

export const single = async (req: singleResources.Request) =>
	await axios.get<RoleResponse>(singleResources.url(req));

export const create = async (req: createResources.Request) =>
	await axios.post<RoleResponse>(
		createResources.url(),
		req,
		config({ idempotencyKey: req.idempotencyKey }),
	);

export const delete_ = async (req: deleteResources.Request) =>
	await axios.delete(deleteResources.url(), config({ data: req }));
