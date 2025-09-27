import { axios } from '@/api/axios';
import { Result } from '@/api/common/result';
import * as allResources from './all';
import * as sortingsResources from './sortings';
import * as cancelResources from './cancel';
import * as trackResources from './track';
import * as waybillResources from './waybill';

export const all = async (req: allResources.Request) =>
	await axios.get<Result<allResources.Response>>(allResources.url(req));

export const sortings = async () =>
	await axios.get<sortingsResources.Response>(sortingsResources.url());

export const track = async (req: trackResources.Request) =>
	await axios.get<trackResources.Response>(trackResources.url(req));

export const waybill = async (req: waybillResources.Request) =>
	await axios.get(waybillResources.url(req));

export const cancel = async (req: cancelResources.Request) =>
	await axios.patch(cancelResources.url(), req);
