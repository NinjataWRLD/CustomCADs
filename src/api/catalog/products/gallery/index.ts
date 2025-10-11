import { axios } from '@/api/axios';
import { Result } from '@/api/common/result';
import * as allResources from './all';
import * as addTagResources from './add-tag';
import * as removeTagResources from './remove-tag';
import * as singleResources from './single';
import * as sortingsResources from './sortings';

export const all = async (req: allResources.Request) =>
	await axios.get<Result<allResources.Response>>(allResources.url(req));

export const single = async (req: singleResources.Request) =>
	await axios.get<singleResources.Response>(singleResources.url(req));

export const sortings = async () =>
	await axios.get<sortingsResources.Response>(sortingsResources.url());

export const addTag = async (req: addTagResources.Request) =>
	await axios.patch(addTagResources.url(), req);

export const removeTag = async (req: removeTagResources.Request) =>
	await axios.patch(removeTagResources.url(), req);
