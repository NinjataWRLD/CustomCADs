import { axios } from '@/api/axios';
import { Result } from '@/api/common/result';
import * as allResources from './all';
import * as singleResources from './single';
import * as sortingsResources from './sortings';
import * as paymentStatusesResources from './payment-statuses';
import * as statsResources from './stats';

export const all = async (req: allResources.Request) =>
	await axios.get<Result<allResources.Response>>(allResources.url(req));

export const single = async (req: singleResources.Request) =>
	await axios.get<singleResources.Response>(singleResources.url(req));

export const sortings = async () =>
	await axios.get<sortingsResources.Response>(sortingsResources.url());

export const paymentStatuses = async () =>
	await axios.get<paymentStatusesResources.Response>(
		paymentStatusesResources.url(),
	);

export const stats = async () =>
	await axios.get<statsResources.Response>(statsResources.url());
