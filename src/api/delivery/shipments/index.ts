import axios from '@/api/axios';
import * as allResources from './resources/all';
import * as sortingsResources from './resources/sortings';
import * as cancelResources from './resources/cancel';
import * as trackResources from './resources/track';
import * as waybillResources from './resources/waybill';

export const all = async (req: allResources.Request) =>
	await axios.get<allResources.Response>(allResources.url(req));

export const sortings = async () =>
	await axios.get<sortingsResources.Response>(sortingsResources.url());

export const track = async (req: trackResources.Request) =>
	await axios.get<trackResources.Response>(trackResources.url(req));

export const waybill = async (req: waybillResources.Request) =>
	await axios.get(waybillResources.url(req));

export const cancel = async (req: cancelResources.Request) =>
	await axios.patch(cancelResources.url(), req);
