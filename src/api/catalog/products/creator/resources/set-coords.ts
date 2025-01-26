import { CoordinateType } from '@/api/common/enums/coordinate-type';
import { Coordinates, CREATOR_BASE_PATH } from '@/api/catalog/common';

export interface Request {
	id: string;
	type: CoordinateType;
	coordinates: Coordinates;
}

export const url = () => `${CREATOR_BASE_PATH}`;
