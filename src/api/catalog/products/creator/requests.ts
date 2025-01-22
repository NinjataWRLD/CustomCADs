import axios from '@/api/axios';
import objectToUrl from '@/utils/object-to-url';
import { Result } from '@/api/common/result';
import * as uploadDtos from './types/upload';
import * as createDtos from './types/create';
import * as recentDtos from './types/recent';
import * as statsDtos from './types/stats';
import * as editDtos from './types/edit';
import * as singleDtos from './types/single';
import * as downloadDtos from './types/download';
import * as replaceDtos from './types/replace';
import * as setCoordsDtos from './types/set-coords';
import * as deleteDtos from './types/delete';
import * as allDtos from './types/all';

const BASE_PATH = '/products';

export const create = async (req: createDtos.Request) =>
	await axios.post<createDtos.Response>(`${BASE_PATH}`, req);

export const upload = async (req: uploadDtos.Request) =>
	await axios.post<uploadDtos.Response>(`${BASE_PATH}/upload`, req);

export const recent = async (req: recentDtos.Request) =>
	await axios.get<recentDtos.Response>(
		`${BASE_PATH}/recent?limit=${req.limit}`,
	);

export const stats = async () =>
	await axios.get<statsDtos.Response>(`${BASE_PATH}/stats`);

export const all = async (req: allDtos.Request) =>
	await axios.get<Result<allDtos.Response>>(
		`${BASE_PATH}?${objectToUrl(req)}`,
	);

export const single = async (req: singleDtos.Request) =>
	await axios.get<singleDtos.Response>(`${BASE_PATH}/${req.id}`);

export const downloadImage = async (req: downloadDtos.Request) =>
	await axios.post<downloadDtos.Response>(
		`${BASE_PATH}/presignedUrls/download/image`,
		req,
	);

export const downloadCad = async (req: downloadDtos.Request) =>
	await axios.post<downloadDtos.Response>(
		`${BASE_PATH}/presignedUrls/download/cad`,
		req,
	);

export const edit = async (req: editDtos.Request) =>
	await axios.put(`${BASE_PATH}/${req.id}`, req);

export const setCadCoords = async (req: setCoordsDtos.Request) =>
	await axios.patch(`${BASE_PATH}/${req.id}`);

export const changeImage = async (req: replaceDtos.Request) =>
	await axios.post<replaceDtos.Response>(
		`${BASE_PATH}/presignedUrls/replace/image`,
		req,
	);

export const changeCad = async (req: replaceDtos.Request) =>
	await axios.post<replaceDtos.Response>(
		`${BASE_PATH}/presignedUrls/replace/cad`,
		req,
	);

export const delete_ = async (req: deleteDtos.Request) =>
	await axios.delete(`${BASE_PATH}/${req.id}`);
