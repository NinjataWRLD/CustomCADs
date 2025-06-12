import { useEffect, useState } from 'react';
import { Route } from '@/routes/(private)/_customer/carts';
import { usePagination } from '@/hooks/usePagination';
import {
	useGetPurchasedCartsPaymentStatuses,
	useGetPurchasedCartsSortings,
} from '@/hooks/queries/purchased-carts';
import { usePurchasedCartsTranslation } from '@/hooks/locales/pages/customer';
import Transition from '@/app/components/transition';
import Pagination from '@/app/components/pagination';
import Sortings from '@/app/components/search/sortings';
import Statuses from '@/app/components/search/statuses';
import Cart from './cart';

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
	const statuses = useGetPurchasedCartsPaymentStatuses();

	const [dropdown, setDropdown] = useState<'sorting' | 'payment-statuses'>();
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
			<div className='relative h-screen flex flex-col justify-center items-center text-[white]'>
				<h1 className='text-[2.2rem] title-text-shadow'>
					{tCarts('title')}
				</h1>
				<div className='relative flex justify-center w-full max-w-[1200px] gap-[30px] p-5'>
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
						isActive={dropdown === 'payment-statuses'}
						setActive={(active) =>
							setDropdown(active ? 'payment-statuses' : undefined)
						}
					/>
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
				<div className='w-full h-3/5 gap-5 flex flex-col items-center justify-start mb-5'>
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
