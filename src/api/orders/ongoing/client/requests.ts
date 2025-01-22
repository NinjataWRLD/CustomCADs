import axios from '@/api/axios';
import objectToUrl from '@/utils/object-to-url';
import * as createDtos from './types/create';
import * as statsDtos from './types/stats';
import * as recentDtos from './types/recent';
import * as singleDtos from './types/single';
import * as editDtos from './types/edit';
import * as allDtos from './types/all';
import * as deleteDtos from './types/delete';
import * as purchaseDtos from './types/purchase';
import * as caluclateShipmentDtos from './types/calculate-shipment';
import * as purchaseWithDeliveryDtos from './types/purchase-delivery';

const BASE_PATH = 'orders/ongoing/client';

export const create = async (req: createDtos.Request) =>
	await axios.post<createDtos.Response>(`${BASE_PATH}`, req);

export const purchase = async (req: purchaseDtos.Request) =>
	await axios.post(`${BASE_PATH}`, req);

export const purchaseWithDelivery = async (
	req: purchaseWithDeliveryDtos.Request,
) => await axios.post(`${BASE_PATH}`, req);

export const stats = async () =>
	await axios.get<statsDtos.Response>(`${BASE_PATH}/stats`);

export const recent = async (req: recentDtos.Request) =>
	await axios.get<recentDtos.Response[]>(
		`${BASE_PATH}/recent?limit=${req.limit}`,
	);

export const all = async (req: allDtos.Request) =>
	await axios.put(`${BASE_PATH}?${objectToUrl(req)}`);

export const single = async (req: singleDtos.Request) =>
	await axios.get<singleDtos.Response>(`${BASE_PATH}/${req.id}`);

export const calculateShipment = async (req: caluclateShipmentDtos.Request) =>
	await axios.get<caluclateShipmentDtos.Response>(
		`${BASE_PATH}?${objectToUrl(req)}`,
	);

export const edit = async (req: editDtos.Request) =>
	await axios.put(`${BASE_PATH}/${req.id}`);

export const delete_ = async (req: deleteDtos.Request) =>
	await axios.delete(`${BASE_PATH}/${req.id}`);
