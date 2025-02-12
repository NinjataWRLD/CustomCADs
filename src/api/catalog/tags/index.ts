import axios from '@/api/axios';
import * as allResources from './resources/all';
import * as singleResources from './resources/single';
import * as createResources from './resources/create';
import * as editResources from './resources/edit';
import * as deleteResources from './resources/delete';

export const all = async () =>
	await axios.get<allResources.Response[]>(allResources.url());

export const single = async (req: singleResources.Request) =>
	await axios.get<singleResources.Response>(singleResources.url(req));

export const create = async (req: createResources.Request) =>
	await axios.post<createResources.Response>(createResources.url(), req);

export const edit = async (req: editResources.Request) =>
	await axios.put(editResources.url(), req);

export const delete_ = async (req: deleteResources.Request) =>
	await axios.delete(deleteResources.url(), { data: req });
