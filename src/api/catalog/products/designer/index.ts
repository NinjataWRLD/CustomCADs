import { axios } from '@/api/axios';
import { Result } from '@/api/common/result';
import * as allResources from './all';
import * as singleResources from './single';
import * as validateResources from './validate';
import * as reportResources from './report';

export const unchecked = async (req: allResources.Request) =>
	await axios.get<Result<allResources.Response>>(
		allResources.url(req, 'unchecked'),
	);

export const validated = async (req: allResources.Request) =>
	await axios.get<Result<allResources.Response>>(
		allResources.url(req, 'validated'),
	);

export const reported = async (req: allResources.Request) =>
	await axios.get<Result<allResources.Response>>(
		allResources.url(req, 'reported'),
	);

export const single = async (req: singleResources.Request) =>
	await axios.get<singleResources.Response>(singleResources.url(req));

export const validate = async (req: validateResources.Request) =>
	await axios.patch(validateResources.url(), req);

export const report = async (req: reportResources.Request) =>
	await axios.patch(reportResources.url(), req);
