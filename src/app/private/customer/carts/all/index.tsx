import { useEffect } from 'react';
import { Route } from '@/routes/(private)/_customer/carts';
import { usePurchasedCartsTranslation } from '@/hooks/locales/pages/customer';
import { useNotFoundTranslation } from '@/hooks/locales/common/messages';
import Transition from '@/app/components/transition';
import Pagination from '@/app/components/pagination';
import { useCartsDropdowns } from './hooks/useCartsDropdowns';
import Cart from './cart';

const CARTS_ITEMS_PER_PAGE = 12;
const PurchasedCarts = () => {
	const { carts } = Route.useLoaderData();
	const navigate = Route.useNavigate();

	const dropdowns = useCartsDropdowns();
	const tCarts = usePurchasedCartsTranslation();
	const tNotFound = useNotFoundTranslation();

	useEffect(() => {
		const styleEl = document.createElement('style');
		styleEl.textContent = `
		  .carts::-webkit-scrollbar {
    		  width: 8px;
		   }

		  .carts::-webkit-scrollbar-thumb {
    		  background-color: #888;
    		  border-radius: 10px;
		   }

		  .carts > * {
    		  flex: 0 0 auto;
		   }
		`;
		document.head.appendChild(styleEl);

		return () => {
			document.head.removeChild(styleEl);
		};
	}, []);

	return (
		<Transition>
			<div className='relative h-screen flex flex-col justify-center items-center text-[white] overflow-hidden'>
				<h1 className='text-[2.2rem] title-text-shadow'>
					{tCarts('title')}
				</h1>
				<div className='relative flex justify-center w-full max-w-[1200px] gap-[30px] p-5'>
					{<dropdowns.Statuses />}
					{<dropdowns.Sortings />}
				</div>
				<div
					className='carts w-full h-3/5 gap-5 flex flex-col items-center justify-start mb-5'
					style={{
						overflowY: carts && carts.count > 2 ? 'auto' : 'unset',
						scrollbarWidth: 'thin',
						scrollbarColor: '#aaa transparent',
					}}
				>
					{carts.items.length ? (
						carts.items.map((cart) => (
							<Cart
								key={cart.id}
								id={cart.id}
								navigate={navigate}
							/>
						))
					) : (
						<div className='min-h-[60dvh] flex items-center text-white text-2xl text-shadow-custom'>
							{tNotFound('no-products')}
						</div>
					)}
				</div>
				<Pagination
					total={carts.count}
					defaultLimit={CARTS_ITEMS_PER_PAGE}
					navigate={(pagination) =>
						navigate({
							search: (prev) => ({
								...prev,
								...pagination,
							}),
						})
					}
				/>
			</div>
		</Transition>
	);
};

export default PurchasedCarts;
