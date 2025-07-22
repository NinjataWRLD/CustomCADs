import { axios, config } from '@/api/axios';
import { CustomizationResponse } from '@/api/customizations/common';
import * as singleResources from './single';
import * as createResources from './create';
import * as editResources from './edit';
import * as deleteResources from './delete';

export const create = (req: createResources.Request) =>
	axios.post<CustomizationResponse>(
		createResources.url(),
		req,
		config({ idempotencyKey: req.idempotencyKey }),
	);

export const single = (req: singleResources.Request) =>
	axios.get<CustomizationResponse>(singleResources.url(req));

export const edit = (req: editResources.Request) =>
	axios.put(editResources.url(), req);

export const delete_ = (req: deleteResources.Request) =>
	axios.delete(deleteResources.url(), config({ data: req }));
