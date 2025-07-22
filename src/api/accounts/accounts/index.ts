import { axios, config } from '@/api/axios';
import { Result } from '@/api/common/result';
import { AccountResponse } from '../common';
import * as allResources from './all';
import * as sinlgeResources from './single';
import * as sortingResources from './sortings';
import * as createResources from './create';
import * as deleteResources from './delete';

export const all = async (req: allResources.Request) =>
	await axios.get<Result<AccountResponse>>(allResources.url(req));

export const single = async (req: sinlgeResources.Request) =>
	await axios.get<AccountResponse>(sinlgeResources.url(req));

export const sortings = async () =>
	await axios.get<sortingResources.Response>(sortingResources.url());

export const create = async (req: createResources.Request) =>
	await axios.post<AccountResponse>(
		createResources.url(),
		req,
		config({ idempotencyKey: req.idempotencyKey }),
	);

export const delete_ = async (req: deleteResources.Request) =>
	await axios.delete(deleteResources.url(), config({ data: req }));
