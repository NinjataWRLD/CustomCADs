import { Route } from '@/routes/(private)/_customer/carts/index';
import { useDropdown } from '@/hooks/useDropdown';
import Sortings from '@/app/components/search/sortings';
import {
	useGetPurchasedCartsPaymentStatuses,
	useGetPurchasedCartsSortings,
} from '@/hooks/queries/purchased-carts';
import Statuses from '@/app/components/search/statuses';

export const useCartsDropdowns = () => {
	const navigate = Route.useNavigate();
	const search = Route.useSearch();

	const statuses = useGetPurchasedCartsPaymentStatuses();
	const sortings = useGetPurchasedCartsSortings();
	const dropdown = useDropdown<'sorting' | 'status'>();

	return {
		Statuses: () => (
			<Statuses
				fetch={statuses}
				getStatus={() => search.paymentStatus}
				updateStatus={(paymentStatus) => {
					navigate({
						search: (prev) => ({
							...prev,
							paymentStatus: paymentStatus,
						}),
					});
				}}
				isActive={dropdown.is('status')}
				setActive={(active) => dropdown.set(active, 'status')}
			/>
		),
		Sortings: () => (
			<Sortings
				fetch={sortings}
				getSorting={() => ({
					type: search.sortingType,
					direction: search.sortingDirection,
				})}
				updateSorting={({ type, direction }) => {
					navigate({
						search: (prev) => ({
							...prev,
							sortingType: type ?? prev.sortingType,
							sortingDirection: direction,
						}),
					});
				}}
				isActive={dropdown.is('sorting')}
				setActive={(active) => dropdown.set(active, 'sorting')}
			/>
		),
	};
};
