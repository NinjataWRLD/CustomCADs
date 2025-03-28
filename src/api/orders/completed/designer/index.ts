import { axios } from '@/api/axios';
import { Result } from '@/api/common/result';
import * as allResources from './resources/all';
import * as singleResources from './resources/single';

export const all = async (req: allResources.Request) =>
	await axios.get<Result<allResources.Response>>(allResources.url(req));

export const single = async (req: singleResources.Request) =>
	await axios.get<singleResources.Response>(singleResources.url(req));
