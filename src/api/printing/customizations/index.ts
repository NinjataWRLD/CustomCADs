import { axios, config } from '@/api/axios';
import { CustomizationResponse } from '@/api/printing/common';
import * as singleResources from './single';
import * as createResources from './create';
import * as editResources from './edit';

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
