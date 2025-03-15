import { axios } from '@/api/axios';
import { RoleResponse } from '../common';
import * as allResources from './resources/all';
import * as singleResources from './resources/single';
import * as createResources from './resources/create';
import * as deleteResources from './resources/delete';

export const all = async () =>
	await axios.get<RoleResponse[]>(allResources.url());

export const single = async (req: singleResources.Request) =>
	await axios.get<RoleResponse>(singleResources.url(req));

export const create = async (req: createResources.Request) =>
	await axios.post<RoleResponse>(createResources.url(), req);

export const delete_ = async (req: deleteResources.Request) =>
	await axios.delete(deleteResources.url(), { data: req });
