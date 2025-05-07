import { useEffect, useState } from 'react';
import { Route } from '@/routes/(private)/_customer/carts';
import { usePagination } from '@/hooks/usePagination';
import { useGetPurchasedCartsSortings } from '@/hooks/queries/purchased-carts';
import { usePurchasedCartsTranslation } from '@/hooks/locales/pages/customer';
import Transition from '@/app/components/transition';
import Pagination from '@/app/components/pagination';
import Sortings from '@/app/components/search/sortings';
import Cart from './cart';
import styles from './styles.module.css';

const GALLERY_ITEMS_PER_PAGE = 12;
const PurchasedCarts = () => {
	const { carts } = Route.useLoaderData();
	const navigate = Route.useNavigate();
	const search = Route.useSearch();

	const [total, setTotal] = useState(0);
	const { page, limit, handlePageChange } = usePagination(
		total,
		search.limit ?? GALLERY_ITEMS_PER_PAGE,
	);

	const tCarts = usePurchasedCartsTranslation();
	const sortings = useGetPurchasedCartsSortings();

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
		if (carts.count) {
			setTotal(carts.count);
		}
	}, [carts]);

	return (
		<Transition>
			<div className={styles.container}>
				<h1>{tCarts('title')}</h1>
				<div className={styles.sorting}>
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
						isActive={dropdown === 'sorting'}
						setActive={(active) =>
							setDropdown(active ? 'sorting' : undefined)
						}
					/>
				</div>
				<div className={styles.content}>
					{carts.items.map((cart) => (
						<Cart key={cart.id} id={cart.id} navigate={navigate} />
					))}
				</div>
				<Pagination
					limit={limit}
					page={page}
					total={total}
					onPageChange={handlePageChange}
				/>
			</div>
		</Transition>
	);
};

export default PurchasedCarts;
