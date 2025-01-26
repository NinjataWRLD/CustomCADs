import objectToUrl from '@/utils/object-to-url';
import { AccountSorting, SortingDirection } from '@/api/common/enums/sortings';
import { ACCOUNTS_BASE_PATH } from '../../common';

export interface Request {
	name?: string;
	sortingType?: AccountSorting;
	sortingDirection?: SortingDirection;
	page: number;
	limit: number;
}

export const url = (req: Request) =>
	`${ACCOUNTS_BASE_PATH}?${objectToUrl(req)}`;
