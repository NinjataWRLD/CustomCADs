import axios from '@/api/axios';
import objectToUrl from '@/utils/object-to-url';
import { Result } from '@/api/common/result';
import { AccountResponse } from '../common';
import * as allDtos from './types/all';
import * as sinlgeDtos from './types/single';
import * as createDtos from './types/create';
import * as deleteDtos from './types/delete';

const BASE_PATH = '/accounts';

export const all = async (req: allDtos.Request) =>
	await axios.get<Result<AccountResponse>>(
		`${BASE_PATH}?${objectToUrl(req)}`,
	);

export const single = async (req: sinlgeDtos.Request) =>
	await axios.get<AccountResponse>(`${BASE_PATH}/${req.username}`);

export const create = async (req: createDtos.Request) =>
	await axios.post<AccountResponse>(`${BASE_PATH}`, req);

export const delete_ = async (req: deleteDtos.Request) =>
	await axios.delete(`${BASE_PATH}`, { data: req });
