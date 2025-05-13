import { useEffect, useState } from 'react';
import { UseNavigateResult } from '@tanstack/react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowLeft,
	faArrowRight,
	faSync,
} from '@fortawesome/free-solid-svg-icons';
import { usePagination } from '@/hooks/usePagination';
import { useGetPurchasedCart } from '@/hooks/queries/purchased-carts';
import { usePurchasedCartsTranslation } from '@/hooks/locales/pages/customer';
import CustomLink from '@/app/components/link';
import * as dateTime from '@/utils/date-time';
import Item from './item';

interface CartProps {
	id: string;
	navigate: UseNavigateResult<'/carts'>;
}

const CART_ITEMS_PER_PAGE = 3;
const Cart = ({ id, navigate }: CartProps) => {
	const tCarts = usePurchasedCartsTranslation();
	const { data: cart } = useGetPurchasedCart({ id });

	const [count, setCount] = useState(0);
	useEffect(() => {
		if (cart) {
			setCount(cart.items.length);
		}
	}, [cart]);

	const { page, limit, handlePageChange } = usePagination(
		count,
		CART_ITEMS_PER_PAGE,
		true,
	);

	const [isClicked, setIsClicked] = useState(false);
	const toggleIsClicked = () => setIsClicked((prev) => !prev);

	if (!cart) return;
	const { items, purchasedAt, total } = cart;

	const handlePrevious = () => {
		handlePageChange(page - 1);
	};
	const handleNext = () => {
		handlePageChange(page + 1);
	};

	const start = limit * (page - 1);
	const end = start + limit;
	return (
		<div
			className='w-[70%] h-1/5 m-auto rounded-xl border-2 border-solid border-[purple]'
			style={{ perspective: '1500px', transformStyle: 'preserve-3d' }}
		>
			<div
				className={`w-full h-full relative transition-transform duration-[1s] ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] rounded-[10px] inner ${isClicked ? 'flipped' : ''}`}
				style={{ transformStyle: 'preserve-3d' }}
			>
				<div
					className='absolute w-full h-full bg-[#6a2c7069] text-white flex items-center gap-10 rounded-[10px] cursor-pointer'
					style={{
						backfaceVisibility: 'hidden',
						transform: 'rotateY(0deg)',
					}}
					onClick={toggleIsClicked}
				>
					<p className='font-bold ml-[30px]'>
						{tCarts('first-column')} #
						<span>{id.split('-').at(-1)}</span>
					</p>
					<div>
						<p className='font-bold ml-[30px] text-[gray]'>
							{tCarts('second-column')}
						</p>
						<p className='font-bold ml-[30px]'>
							{dateTime.format({ date: purchasedAt })}
						</p>
					</div>
					<div>
						<p className='font-bold ml-[30px] text-[gray]'>
							{tCarts('third-column')}
						</p>
						<p className='font-bold ml-[30px]'>
							${total.toFixed(2)}
						</p>
					</div>
					<div>
						<p className='font-bold ml-[30px] text-[gray]'>
							{tCarts('fourth-column')}
						</p>
						<p className='font-bold ml-[30px]'>
							{tCarts('items-length', { count: items.length })}
						</p>
					</div>
					<div className='absolute flex gap-[30px] right-[3%]'>
						<CustomLink
							text={tCarts('button-2')}
							to='/'
						></CustomLink>
					</div>
				</div>
				<div
					className='bg-[#3f20445f] w-full h-full text-white flex items-center justify-around rounded-[10px]'
					style={{
						backfaceVisibility: 'hidden',
						transform: 'rotateY(180deg)',
					}}
				>
					<FontAwesomeIcon
						onClick={toggleIsClicked}
						icon={faSync}
						rotation={270}
						className='text-[1.8rem] cursor-pointer transition-[color] duration-[0.3s] ease-linear hover:text-[gray]'
					/>
					<div className='w-9/12 flex justify-center items-center gap-5'>
						{items.slice(start, end).map((item) => (
							<Item
								key={item.productId}
								item={item}
								navigate={navigate}
							/>
						))}
					</div>
					<div className='flex flex-col gap-[15px] text-[1.8rem]'>
						<FontAwesomeIcon
							icon={faArrowLeft}
							onClick={handlePrevious}
							className='cursor-pointer transition-[color] duration-[0.3s] ease-linear hover:text-[gray]'
						/>
						<FontAwesomeIcon
							icon={faArrowRight}
							onClick={handleNext}
							className='cursor-pointer transition-[color] duration-[0.3s] ease-linear hover:text-[gray]'
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
