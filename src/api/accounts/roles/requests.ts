import axios from '@/api/axios';
import { RoleResponse } from '../common';
import * as singleDtos from './types/single';
import * as createDtos from './types/create';
import * as deleteDtos from './types/delete';

const BASE_PATH = '/roles';

export const all = async () => await axios.get<RoleResponse[]>(`${BASE_PATH}`);

export const single = async (req: singleDtos.Request) =>
	await axios.get<RoleResponse>(`${BASE_PATH}/${req.name}`);

export const create = async (req: createDtos.Request) =>
	await axios.post<RoleResponse>(`${BASE_PATH}`, req);

export const delete_ = async (req: deleteDtos.Request) =>
	await axios.delete(`${BASE_PATH}`, { data: req });
