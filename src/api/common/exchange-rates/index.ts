import { axios } from '@/api/axios';
import { ExchangeRate } from './common';
import * as allResources from './all';

export const all = async () =>
	await axios.get<ExchangeRate[]>(allResources.url());
