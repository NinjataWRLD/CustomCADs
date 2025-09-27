import { axios } from '@/api/axios';
import { Result } from '@/api/common/result';
import * as allResources from './all';
import * as categoryResources from './category';
import * as statusResources from './status';

export const all = async (req: allResources.Request) =>
	await axios.get<Result<allResources.Response>>(allResources.url(req));

export const setCategory = async (req: categoryResources.Request) =>
	await axios.patch(categoryResources.url(), req);

export const remove = async (req: statusResources.Request) =>
	await axios.patch(statusResources.url('remove'), req);
