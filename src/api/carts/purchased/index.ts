import axios from '@/api/axios';
import * as downloadResources from './resources/download';
import * as allResources from './resources/all';
import * as singleResources from './resources/single';
import * as sortingsResources from './resources/sortings';
import * as statsResources from './resources/stats';

export const all = async (req: allResources.Request) =>
	await axios.get<allResources.Response>(allResources.url(req));

export const single = async (req: singleResources.Request) =>
	await axios.get<singleResources.Response>(singleResources.url(req));

export const sortings = async () =>
	await axios.get<sortingsResources.Response>(sortingsResources.url());

export const stats = async () =>
	await axios.get<statsResources.Response>(statsResources.url());

export const download = async (req: downloadResources.Request) =>
	await axios.post<downloadResources.Response>(downloadResources.url(), req);
