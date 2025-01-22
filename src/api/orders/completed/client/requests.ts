import axios from '@/api/axios';
import objectToUrl from '@/utils/object-to-url';
import { Result } from '@/api/common/result';
import * as allDtos from './types/all';
import * as singleDtos from './types/single';
import * as downloadDtos from './types/download';

const BASE_PATH = '/orders/completed/client';

export const all = async (req: allDtos.Request) =>
	await axios.get<Result<allDtos.Response>>(
		`${BASE_PATH}?${objectToUrl(req)}`,
	);

export const single = async (req: singleDtos.Request) =>
	await axios.get<singleDtos.Response>(`${BASE_PATH}/${req.id}`);

export const stats = async () => await axios.get<number>(`${BASE_PATH}/stats`);

export const downloadCad = async (req: downloadDtos.Request) =>
	await axios.post<downloadDtos.Response>(
		`${BASE_PATH}/presignedUrls/download/cad`,
		req,
	);
