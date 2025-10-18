import { axios, config } from '@/api/axios';
import { Result } from '@/api/common/result';
import * as createResources from './create';
import * as recentResources from './recent';
import * as statsResources from './stats';
import * as editResources from './edit';
import * as singleResources from './single';
import * as deleteResources from './delete';
import * as allResources from './all';

export const create = async (req: createResources.Request) =>
	await axios.post<createResources.Response>(
		createResources.url(),
		req,
		config({ idempotencyKey: req.idempotencyKey }),
	);

export const recent = async (req: recentResources.Request) =>
	await axios.get<recentResources.Response>(recentResources.url(req));

export const stats = async () =>
	await axios.get<statsResources.Response>(statsResources.url());

export const all = async (req: allResources.Request) =>
	await axios.get<Result<allResources.Response>>(allResources.url(req));

export const single = async (req: singleResources.Request) =>
	await axios.get<singleResources.Response>(singleResources.url(req));

export const edit = async (req: editResources.Request) =>
	await axios.put(editResources.url(), req);

export const delete_ = async (req: deleteResources.Request) =>
	await axios.delete(deleteResources.url(), config({ data: req }));
