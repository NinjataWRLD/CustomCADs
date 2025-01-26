import axios from '@/api/axios';
import * as authnResources from './resources/authn';
import * as authzResources from './resources/authz';

export const authn = async () =>
	await axios.get<authnResources.Response>(authnResources.url());

export const authz = async () =>
	await axios.get<authzResources.Response>(authzResources.url());
