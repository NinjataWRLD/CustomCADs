import { axios } from '@/api/axios';
import { Result } from '@/api/common/result';
import * as allResources from './all';
import * as singleResources from './single';
import * as categoryResources from './category';
import * as statusResources from './status';
import * as finishResources from './finish';

export const all = async (req: allResources.Request) =>
	await axios.get<Result<allResources.Response>>(allResources.url(req));

export const single = async (req: singleResources.Request) =>
	await axios.get<singleResources.Response>(singleResources.url(req));

export const setCategory = async (req: categoryResources.Request) =>
	await axios.patch(categoryResources.url(), req);

export const report = async (req: statusResources.Request) =>
	await axios.patch(statusResources.url('report'), req);

export const accept = async (req: statusResources.Request) =>
	await axios.patch(statusResources.url('accept'), req);

export const cancel = async (req: statusResources.Request) =>
	await axios.patch(statusResources.url('cancel'), req);

export const begin = async (req: statusResources.Request) =>
	await axios.patch(statusResources.url('begin'), req);

export const finish = async (req: finishResources.Request) =>
	await axios.patch(finishResources.url(), req);
