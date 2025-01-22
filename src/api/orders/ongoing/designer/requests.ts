import axios from '@/api/axios';
import objectToUrl from '@/utils/object-to-url';
import { Result } from '@/api/common/result';
import * as pendingDtos from './types/pending';
import * as cancelDtos from './types/cancel';
import * as acceptedDtos from './types/accepted';
import * as acceptDtos from './types/accept';
import * as begunDtos from './types/begun';
import * as beginDtos from './types/begin';
import * as finishedDtos from './types/finished';
import * as finishDtos from './types/finish';
import * as uploadDtos from './types/upload';
import * as reportedDtos from './types/reported';
import * as reportDtos from './types/report';
import * as singleDtos from './types/single';

const BASE_PATH = '/orders/ongoing/designer';

export const pending = async (req: pendingDtos.Request) =>
	await axios.get<Result<pendingDtos.Response>>(
		`${BASE_PATH}/pending?${objectToUrl(req)}`,
	);

export const accepted = async (req: acceptedDtos.Request) =>
	await axios.get<Result<acceptedDtos.Response>>(
		`${BASE_PATH}/accepted?${objectToUrl(req)}`,
	);

export const begun = async (req: begunDtos.Request) =>
	await axios.get<Result<begunDtos.Response>>(
		`${BASE_PATH}/begun?${objectToUrl(req)}`,
	);

export const finished = async (req: finishedDtos.Request) =>
	await axios.get<Result<finishedDtos.Response>>(
		`${BASE_PATH}/finished?${objectToUrl(req)}`,
	);

export const reported = async (req: reportedDtos.Request) =>
	await axios.get<Result<reportedDtos.Response>>(
		`${BASE_PATH}/reported?${objectToUrl(req)}`,
	);

export const single = async (req: singleDtos.Request) =>
	await axios.get<singleDtos.Response>(`${BASE_PATH}/${req.id}`);

export const accept = async (req: acceptDtos.Request) =>
	await axios.patch(`${BASE_PATH}/accept`, req);

export const cancel = async (req: cancelDtos.Request) =>
	await axios.patch(`${BASE_PATH}/cancel`, req);

export const begin = async (req: beginDtos.Request) =>
	await axios.patch(`${BASE_PATH}/begin`, req);

export const finish = async (req: finishDtos.Request) =>
	await axios.patch(`${BASE_PATH}/finish`, req);

export const report = async (req: reportDtos.Request) =>
	await axios.patch(`${BASE_PATH}/report`, req);

export const uploadCad = async (req: uploadDtos.Request) =>
	await axios.post(`${BASE_PATH}/presignedUrls/upload/cad`, req);
