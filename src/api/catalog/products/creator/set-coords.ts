import { Coordinates, CREATOR_BASE_PATH } from '@/api/catalog/common';

export type Request = {
	id: string;
	type: 'cam' | 'pan';
	coordinates: Coordinates;
};

export const url = () => `${CREATOR_BASE_PATH}`;
