import axios from '@/api/axios';
import objectToUrl from '@/utils/object-to-url';
import { Result } from '@/api/common/result';
import * as allDtos from './types/all';
import * as singleDtos from './types/single';
import * as validateDtos from './types/validate';
import * as reportDtos from './types/report';

const BASE_PATH = '/products/designer';

export const unchecked = async (req: allDtos.Request) =>
	await axios.get<Result<allDtos.Response>>(
		`${BASE_PATH}/unchecked?${objectToUrl(req)}`,
	);

export const validated = async (req: allDtos.Request) =>
	await axios.get<Result<allDtos.Response>>(
		`${BASE_PATH}/validated?${objectToUrl(req)}`,
	);

export const reported = async (req: allDtos.Request) =>
	await axios.get<Result<allDtos.Response>>(
		`${BASE_PATH}/reported?${objectToUrl(req)}`,
	);

export const single = async (req: singleDtos.Request) =>
	await axios.get<singleDtos.Response>(`${BASE_PATH}/${req.id}`);

export const validate = async (req: validateDtos.Request) =>
	await axios.patch(`${BASE_PATH}/validate`, req);

export const report = async (req: reportDtos.Request) =>
	await axios.patch(`${BASE_PATH}/report`, req);
