import { axios } from '@/api/axios';
import * as removeResources from './remove';

export const remove = async (req: removeResources.Request) =>
	await axios.patch(removeResources.url(), req);
