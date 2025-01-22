import axios from '@/api/axios';
import objectToUrl from '@/utils/object-to-url';
import { Result } from '@/api/common/result';
import * as allDtos from './types/all';
import * as singleDtos from './types/single';

const BASE_PATH = '/gallery';

export const all = async (req: allDtos.Request) =>
	await axios.get<Result<allDtos.Response>>(`${BASE_PATH}?${objectToUrl(req)}`);

export const single = async (req: singleDtos.Request) =>
	await axios.get<singleDtos.Response>(`${BASE_PATH}/${req.id}`);
