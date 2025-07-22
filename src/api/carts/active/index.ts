import { axios, config } from '@/api/axios';
import { ActiveCartItem } from '@/api/carts/common';
import * as addItemResources from './add-item';
import * as removeItemResources from './remove-item';
import * as allResources from './single';
import * as countResources from './count';
import * as quantityResources from './change-quantity';
import * as deliveryResources from './toggle-for-delivery';
import * as purchaseResources from './purchase';
import * as calculateResources from './calculate-shipment';
import * as purchaseWithDeilveryResources from './purchase-delivery';

export const addItem = async (req: addItemResources.Request) =>
	await axios.post<ActiveCartItem>(
		addItemResources.url(),
		req,
		config({ idempotencyKey: req.idempotencyKey }),
	);

export const purchase = async (req: purchaseResources.Request) =>
	await axios.post<purchaseResources.Response>(
		purchaseResources.url(),
		req,
		config({ idempotencyKey: req.idempotencyKey }),
	);

export const purchaseWithDelivery = async (
	req: purchaseWithDeilveryResources.Request,
) =>
	await axios.post<purchaseWithDeilveryResources.Response>(
		purchaseWithDeilveryResources.url(),
		req,
		config({ idempotencyKey: req.idempotencyKey }),
	);

export const all = async () =>
	await axios.get<allResources.Response>(allResources.url());

export const count = async () =>
	await axios.get<countResources.Response>(countResources.url());

export const calculateShipment = async (req: calculateResources.Request) =>
	await axios.get<calculateResources.Response>(calculateResources.url(req));

export const increaseItemQuantity = async (req: quantityResources.Request) =>
	await axios.patch(quantityResources.url(`increase`), req);

export const decreaseItemQuantity = async (req: quantityResources.Request) =>
	await axios.patch(quantityResources.url(`decrease`), req);

export const toggleItemForDelivery = async (req: deliveryResources.Request) =>
	await axios.patch(deliveryResources.url(), req);

export const removeItem = async (req: removeItemResources.Request) =>
	await axios.delete(removeItemResources.url(), { data: req });
