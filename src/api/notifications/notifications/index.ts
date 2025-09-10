import { axios } from '@/api/axios';
import { Result } from '@/api/common/result';
import * as allResources from './all';
import * as sortingsResources from './sortings';
import * as statusesResources from './statuses';
import * as statsResources from './stats';
import * as readResources from './read';
import * as openResources from './open';
import * as hideResources from './hide';

export const all = (req: allResources.Request) =>
	axios.get<Result<allResources.Response>>(allResources.url(req));

export const sortings = () =>
	axios.get<sortingsResources.Response>(sortingsResources.url());

export const statuses = () =>
	axios.get<statusesResources.Response>(statusesResources.url());

export const stats = () =>
	axios.get<statsResources.Response>(statsResources.url());

export const read = (req: readResources.Request) =>
	axios.patch(readResources.url(), req);

export const open = (req: openResources.Request) =>
	axios.patch(openResources.url(), req);

export const hide = (req: hideResources.Request) =>
	axios.patch(hideResources.url(), req);
