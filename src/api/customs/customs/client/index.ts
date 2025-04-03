import { axios } from '@/api/axios';
import * as createResources from './resources/create';
import * as statsResources from './resources/stats';
import * as recentResources from './resources/recent';
import * as singleResources from './resources/single';
import * as sortingsResources from './resources/sortings';
import * as editResources from './resources/edit';
import * as allResources from './resources/all';
import * as deleteResources from './resources/delete';
import * as purchaseResources from './resources/purchase';
import * as caluclateResources from './resources/calculate-shipment';
import * as purchaseWithDeliveryResources from './resources/purchase-delivery';
import * as downloadResources from './resources/download';

export const create = async (req: createResources.Request) =>
	await axios.post<createResources.Response>(createResources.url(), req);

export const purchase = async (req: purchaseResources.Request) =>
	await axios.post(purchaseResources.url(), req);

export const purchaseWithDelivery = async (
	req: purchaseWithDeliveryResources.Request,
) => await axios.post(purchaseWithDeliveryResources.url(), req);

export const download = async (req: downloadResources.Request) =>
	await axios.post<downloadResources.Response>(downloadResources.url(), req);

export const stats = async () =>
	await axios.get<statsResources.Response>(statsResources.url());

export const recent = async (req: recentResources.Request) =>
	await axios.get<recentResources.Response[]>(recentResources.url(req));

export const all = async (req: allResources.Request) =>
	await axios.get(allResources.url(req));

export const single = async (req: singleResources.Request) =>
	await axios.get<singleResources.Response>(singleResources.url(req));

export const sortings = async () =>
	await axios.get<sortingsResources.Response>(sortingsResources.url());

export const calculateShipment = async (req: caluclateResources.Request) =>
	await axios.get<caluclateResources.Response>(caluclateResources.url(req));

export const edit = async (req: editResources.Request) =>
	await axios.put(editResources.url(), req);

export const delete_ = async (req: deleteResources.Request) =>
	await axios.delete(deleteResources.url(), { data: req });
