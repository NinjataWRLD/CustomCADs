import { axios } from '@/api/axios';
import { ActiveCartItem } from '@/api/carts/common';
import * as addItemResources from './resources/add-item';
import * as removeItemResources from './resources/remove-item';
import * as allResources from './resources/single';
import * as quantityResources from './resources/change-quantity';
import * as deliveryResources from './resources/toggle-for-delivery';
import * as purchaseResources from './resources/purchase';
import * as calculateResources from './resources/calculate-shipment';
import * as purchaseWithDeilveryResources from './resources/purchase-delivery';

export const addItem = async (req: addItemResources.Request) =>
	await axios.post<ActiveCartItem>(addItemResources.url(), req);

export const purchase = async (req: purchaseResources.Request) =>
	await axios.post(purchaseResources.url(), req);

export const purchaseWithDelivery = async (
	req: purchaseWithDeilveryResources.Request,
) => await axios.post(purchaseWithDeilveryResources.url(), req);

export const all = async () =>
	await axios.get<allResources.Response>(allResources.url());

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
