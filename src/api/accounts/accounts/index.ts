import axios from '@/api/axios';
import { Result } from '@/api/common/result';
import { AccountResponse } from '../common';
import * as allResources from './resources/all';
import * as sinlgeResources from './resources/single';
import * as createResources from './resources/create';
import * as deleteResources from './resources/delete';

export const all = async (req: allResources.Request) =>
	await axios.get<Result<AccountResponse>>(allResources.url(req));

export const single = async (req: sinlgeResources.Request) =>
	await axios.get<AccountResponse>(sinlgeResources.url(req));

export const create = async (req: createResources.Request) =>
	await axios.post<AccountResponse>(createResources.url(), req);

export const delete_ = async (req: deleteResources.Request) =>
	await axios.delete(deleteResources.url(), { data: req });
