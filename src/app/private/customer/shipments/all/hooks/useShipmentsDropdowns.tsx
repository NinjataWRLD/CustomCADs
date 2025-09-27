import { Route } from '@/routes/(private)/_customer/shipments/index';
import { useDropdown } from '@/hooks/useDropdown';
import Sortings from '@/app/components/search/sortings';
import { useGetShipmentSortings } from '@/hooks/queries/shipments';

export const useShipmentsDropdowns = () => {
	const navigate = Route.useNavigate();
	const search = Route.useSearch();

	const sortings = useGetShipmentSortings();
	const dropdown = useDropdown<'sorting'>();

	return {
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
