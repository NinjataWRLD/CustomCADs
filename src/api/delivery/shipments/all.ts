import { ShipmentSorting, SortingDirection } from '@/api/common/enums/sortings';
import { Address } from '@/api/delivery/common';

export interface Request {
	sortingType?: ShipmentSorting;
	sortingDirection?: SortingDirection;
	page: number;
	limit: number;
}

export interface Response {
	id: string;
	buyerName: string;
	address: Address;
}
