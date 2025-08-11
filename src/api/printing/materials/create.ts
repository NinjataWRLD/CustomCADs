import * as headers from '@/types/headers';
import { MATERIALS_BASE_PATH } from '@/api/printing/common';

export type Request = {
	name: string;
	density: number;
	cost: number;
	textureKey: string;
	textureContentType: string;
} & headers.IdempotencyKey;

export const url = () => `${MATERIALS_BASE_PATH}`;
