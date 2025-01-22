import axios from '@/api/axios';
import objectToUrl from '@/utils/object-to-url';
import * as createDtos from './types/create';
import * as addItemDtos from './types/add-item';
import * as removeItemDtos from './types/remove-item';
import * as singleDtos from './types/single';
import * as increaseQuantityDtos from './types/increase-quantity';
import * as decreaseQuantityDtos from './types/decrease-quantity';
import * as setForDeliveryDtos from './types/set-for-delivery';
import * as purchaseDtos from './types/purchase';
import * as calculateShipmentDtos from './types/calculate-shipment';
import * as purchaseWithDeilveryDtos from './types/purchase-delivery';

const BASE_PATH = '/carts/active';

export const create = async () =>
	await axios.post<createDtos.Response>(`${BASE_PATH}`);

export const addItem = async (req: addItemDtos.Request) =>
	await axios.post<addItemDtos.Response>(`${BASE_PATH}/items`, req);

export const purchase = async (req: purchaseDtos.Request) =>
	await axios.post(`${BASE_PATH}/purchase`, req);

export const purchaseWithDelivery = async (
	req: purchaseWithDeilveryDtos.Request,
) => await axios.post(`${BASE_PATH}/purchase-delivery`, req);

export const single = async () =>
	await axios.get<singleDtos.Response>(`${BASE_PATH}`);

export const calculateShipment = async (req: calculateShipmentDtos.Request) =>
	await axios.get<calculateShipmentDtos.Response>(
		`${BASE_PATH}/calculate?${objectToUrl(req)}`,
	);

export const increaseItemQuantity = async (req: increaseQuantityDtos.Request) =>
	await axios.patch(`${BASE_PATH}/increase`, req);

export const decreaseItemQuantity = async (req: decreaseQuantityDtos.Request) =>
	await axios.patch(`${BASE_PATH}/decrease`, req);

export const setItemForDelivery = async (req: setForDeliveryDtos.Request) =>
	await axios.patch(`${BASE_PATH}/delivery`, req);

export const removeItem = async (req: removeItemDtos.Request) =>
	await axios.delete(`${BASE_PATH}/items`, { data: req });

export const delete_ = async () => await axios.delete(`${BASE_PATH}/items`);
