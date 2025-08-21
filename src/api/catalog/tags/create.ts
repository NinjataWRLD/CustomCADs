import * as headers from '@/types/headers';
import { TAG_BASE_PATH } from '../common';

export type Request = {
	name: string;
} & headers.IdempotencyKey;

export type Response = {
	id: string;
	name: string;
};

export const url = () => `${TAG_BASE_PATH}`;
