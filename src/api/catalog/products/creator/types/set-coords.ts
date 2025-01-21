import { CoordinateType } from '@/api/common/enums/coordinate-type';
import { Coordinates } from '@/api/catalog/common';

export interface Request {
	id: string;
	type: CoordinateType;
	coordinates: Coordinates;
}
