import axios from '@/api/axios';
import { Result } from '@/api/common/result';
import * as allResources from './resources/all';
import * as addTagResources from './resources/add-tag';
import * as removeTagResources from './resources/remove-tag';
import * as singleResources from './resources/single';
import * as sortingsResources from './resources/sortings';
import * as downloadResources from './resources/download';

export const all = async (req: allResources.Request) =>
	await axios.get<Result<allResources.Response>>(allResources.url(req));

export const single = async (req: singleResources.Request) =>
	await axios.get<singleResources.Response>(singleResources.url(req));

export const sortings = async () =>
	await axios.get<sortingsResources.Response>(sortingsResources.url());

export const downloadImage = async (req: downloadResources.Request) =>
	await axios.post<downloadResources.Response>(
		downloadResources.url('image'),
		req,
	);

export const downloadCad = async (req: downloadResources.Request) =>
	await axios.post<downloadResources.Response>(
		downloadResources.url('cad'),
		req,
	);

export const addTag = async (req: addTagResources.Request) =>
	await axios.patch(addTagResources.url(), req);

export const removeTag = async (req: removeTagResources.Request) =>
	await axios.patch(removeTagResources.url(), req);
