import { axios } from '@/api/axios';
import { Result } from '@/api/common/result';
import * as allResources from './resources/all';
import * as singleResources from './resources/single';
import * as statusResources from './resources/status';
import * as finishResources from './resources/finish';
import * as uploadResources from './resources/upload';

export const pending = async (req: allResources.Request) =>
	await axios.get<Result<allResources.Response>>(
		allResources.url(req, 'pending'),
	);

export const reported = async (req: allResources.Request) =>
	await axios.get<Result<allResources.Response>>(
		allResources.url(req, 'reported'),
	);

export const accepted = async (req: allResources.Request) =>
	await axios.get<Result<allResources.Response>>(
		allResources.url(req, 'accepted'),
	);

export const begun = async (req: allResources.Request) =>
	await axios.get<Result<allResources.Response>>(
		allResources.url(req, 'begun'),
	);

export const finished = async (req: allResources.Request) =>
	await axios.get<Result<allResources.Response>>(
		allResources.url(req, 'finished'),
	);

export const single = async (req: singleResources.Request) =>
	await axios.get<singleResources.Response>(singleResources.url(req));

export const report = async (req: statusResources.Request) =>
	await axios.patch(statusResources.url('report'), req);

export const accept = async (req: statusResources.Request) =>
	await axios.patch(statusResources.url('accept'), req);

export const cancel = async (req: statusResources.Request) =>
	await axios.patch(statusResources.url('cancel'), req);

export const begin = async (req: statusResources.Request) =>
	await axios.patch(statusResources.url('begin'), req);

export const finish = async (req: finishResources.Request) =>
	await axios.patch(finishResources.url(), req);

export const uploadCad = async (req: uploadResources.Request) =>
	await axios.post(uploadResources.url(), req);
