import axios from '@/api/axios';
import objectToUrl from '@/utils/object-to-url';
import * as downloadDtos from './types/download';
import * as allDtos from './types/all';
import * as singleDtos from './types/single';
import * as statsDtos from './types/stats';

const BASE_PATH = '/carts/purchased';

export const all = async (req: allDtos.Request) =>
	await axios.get<allDtos.Response>(`${BASE_PATH}?${objectToUrl(req)}`);

export const single = async (req: singleDtos.Request) =>
	await axios.get<singleDtos.Response>(`${BASE_PATH}/${req.id}`);

export const stats = async () =>
	await axios.get<statsDtos.Response>(`${BASE_PATH}/stats`);

export const download = async (req: downloadDtos.Request) =>
	await axios.post<downloadDtos.Response>(`${BASE_PATH}`, req);
