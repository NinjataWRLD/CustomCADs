import axios from '@/api/axios';
import { Result } from '@/api/common/result';
import * as uploadResources from './resources/upload';
import * as createResources from './resources/create';
import * as recentResources from './resources/recent';
import * as statsResources from './resources/stats';
import * as editResources from './resources/edit';
import * as singleResources from './resources/single';
import * as downloadResources from './resources/download';
import * as replaceResources from './resources/replace';
import * as setCoordsResources from './resources/set-coords';
import * as deleteResources from './resources/delete';
import * as allResources from './resources/all';

export const create = async (req: createResources.Request) =>
	await axios.post<createResources.Response>(createResources.url(), req);

export const upload = async (req: uploadResources.Request) =>
	await axios.post<uploadResources.Response>(uploadResources.url(), req);

export const recent = async (req: recentResources.Request) =>
	await axios.get<recentResources.Response>(recentResources.url(req));

export const stats = async () =>
	await axios.get<statsResources.Response>(statsResources.url());

export const all = async (req: allResources.Request) =>
	await axios.get<Result<allResources.Response>>(allResources.url(req));

export const single = async (req: singleResources.Request) =>
	await axios.get<singleResources.Response>(singleResources.url(req));

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

export const edit = async (req: editResources.Request) =>
	await axios.put(editResources.url(), req);

export const setCadCoords = async (req: setCoordsResources.Request) =>
	await axios.patch(setCoordsResources.url(), req);

export const changeImage = async (req: replaceResources.Request) =>
	await axios.post<replaceResources.Response>(
		replaceResources.url('image'),
		req,
	);

export const changeCad = async (req: replaceResources.Request) =>
	await axios.post<replaceResources.Response>(
		replaceResources.url('cad'),
		req,
	);

export const delete_ = async (req: deleteResources.Request) =>
	await axios.delete(deleteResources.url(), { data: req });
