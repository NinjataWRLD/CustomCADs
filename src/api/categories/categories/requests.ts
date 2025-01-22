import axios from '@/api/axios';
import { CategoryResponse } from '../common';
import * as createDtos from './types/create';
import * as singleDtos from './types/single';
import * as editDtos from './types/edit';
import * as deleteDtos from './types/delete';

const BASE_PATH = '/categories';

export const all = async () =>
	await axios.get<CategoryResponse[]>(`${BASE_PATH}`);

export const single = async (req: singleDtos.Request) =>
	await axios.get<CategoryResponse>(`${BASE_PATH}/${req.id}`);

export const create = async (req: createDtos.Request) =>
	await axios.post<CategoryResponse>(`${BASE_PATH}`, req);

export const edit = async (req: editDtos.Request) =>
	await axios.put(`${BASE_PATH}/${req.id}`, req);

export const delete_ = async (req: deleteDtos.Request) =>
	await axios.delete(`${BASE_PATH}/${req.id}`);
