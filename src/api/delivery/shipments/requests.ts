import axios from '@/api/axios';
import objectToUrl from '@/utils/object-to-url';
import * as allDtos from './types/all';
import * as cancelDtos from './types/cancel';
import * as trackDtos from './types/track';
import * as waybillDtos from './types/waybill';

const BASE_PATH = '/shipments';

export const all = async (req: allDtos.Request) =>
	await axios.get<allDtos.Response>(`${BASE_PATH}?${objectToUrl(req)}`);

export const track = async (req: trackDtos.Request) =>
	await axios.get<trackDtos.Response>(`${BASE_PATH}/${req.id}/track`);

export const cancel = async (req: cancelDtos.Request) =>
	await axios.patch(`${BASE_PATH}`, req);

export const waybill = async (req: waybillDtos.Request) =>
	await axios.get(`${BASE_PATH}/${req.id}/waybill`);
