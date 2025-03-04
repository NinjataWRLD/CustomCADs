import axios from '@/api/axios';
import { CustomizationResponse } from '@/api/customizations/common';
import * as singleResources from './resources/single';
import * as createResources from './resources/create';
import * as editResources from './resources/edit';
import * as deleteResources from './resources/delete';

export const create = (request: createResources.Request) =>
	axios.post<CustomizationResponse>(createResources.url(), request);

export const single = (request: singleResources.Request) =>
	axios.get<CustomizationResponse>(singleResources.url(request));

export const edit = (request: editResources.Request) =>
	axios.put(editResources.url(), request);

export const delete_ = (request: deleteResources.Request) =>
	axios.delete(deleteResources.url(), { data: request });
