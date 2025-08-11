import * as headers from '@/types/headers';
import { CUSTOMIZATIONS_BASE_PATH } from '@/api/printing/common';

export type Request = {
	scale: number;
	infill: number;
	volume: number;
	color: string;
	materialId: number;
} & headers.IdempotencyKey;

export const url = () => `${CUSTOMIZATIONS_BASE_PATH}`;
