import { useEffect, useState } from 'react';
import { Route } from '@/routes/(private)/_customer/shipments';
import { usePagination } from '@/hooks/usePagination';
import { useGetShipmentSortings } from '@/hooks/queries/shipments';
import { useShipmentsTranslation } from '@/hooks/locales/pages/customer';
import Transition from '@/app/components/transition';
import Sortings from '@/app/components/search/sortings';
import Pagination from '@/app/components/pagination';
import ShipmentItem from './item';
import styles from './styles.module.css';

const SHIPMENTS_PER_PAGE = 6;
const Shipments = () => {
	const tShipments = useShipmentsTranslation();
	const navigate = Route.useNavigate();

	const search = Route.useSearch();
	const { shipments } = Route.useLoaderData();

	const [total, setTotal] = useState(0);
	const { page, limit, handlePageChange } = usePagination(
		total,
		search.limit ?? SHIPMENTS_PER_PAGE,
	);

	const sortings = useGetShipmentSortings();
	const [dropdown, setDropdown] = useState<'sorting'>();

	useEffect(() => {
		navigate({
			search: (prev) => ({
				...prev,
				page,
				limit,
			}),
		});
	}, [page, limit]);

	useEffect(() => {
		if (shipments.count) {
			setTotal(shipments.count);
		}
	}, [shipments]);

	return (
		<Transition>
			<div className={styles.container}>
				<h1>{tShipments('title')}</h1>
				<div className={styles.sorting}>
					<Sortings
						fetch={sortings}
						getSorting={() => ({
							direction: search.sortingDirection,
							type: search.sortingType,
						})}
						updateSorting={({ type, direction }) =>
							navigate({
								search: (prev) => ({
									...prev,
									sortingType: type ?? prev.sortingType,
									sortingDirection: direction,
								}),
							})
						}
						isActive={dropdown === 'sorting'}
						setActive={(active) =>
							setDropdown(active ? 'sorting' : undefined)
						}
					/>
				</div>
				<div className={styles.shipments}>
					{shipments.items.map((shipment) => (
						<ShipmentItem key={shipment.id} shipment={shipment} />
					))}
				</div>
				<Pagination
					limit={limit}
					page={page}
					total={shipments.count}
					onPageChange={handlePageChange}
				/>
			</div>
		</Transition>
	);
};

export default Shipments;
