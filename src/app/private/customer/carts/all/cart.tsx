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
import Button from '@/app/components/button';
import CustomLink from '@/app/components/link';
import * as dateTime from '@/utils/date-time';
import Item from './item';
import styles from './styles.module.css';

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
		<div className={styles.cart}>
			<div
				className={`${styles.inner} ${isClicked ? styles.flipped : ''}`}
			>
				<div className={styles.front}>
					<p>
						{tCarts('first-column')} #
						<span>{id.split('-').at(-1)}</span>
					</p>
					<div className={styles.info}>
						<p>{tCarts('second-column')}</p>
						<p>{dateTime.format({ date: purchasedAt })}</p>
					</div>
					<div className={styles.info}>
						<p>{tCarts('third-column')}</p>
						<p>${total.toFixed(2)}</p>
					</div>
					<div className={styles.info}>
						<p>{tCarts('fourth-column')}</p>
						<p>{tCarts('items-length', { count: items.length })}</p>
					</div>
					<div className={styles.buttons}>
						<Button
							type='button'
							text={tCarts('button-1')}
							onClick={toggleIsClicked}
						/>
						<CustomLink
							text={tCarts('button-2')}
							to='/'
						></CustomLink>
					</div>
				</div>
				<div className={styles.back}>
					<FontAwesomeIcon
						onClick={toggleIsClicked}
						icon={faSync}
						rotation={270}
						className={styles.left}
					/>
					<div className={styles.items}>
						{items.slice(start, end).map((item) => (
							<Item
								key={item.productId}
								item={item}
								navigate={navigate}
							/>
						))}
					</div>
					<div className={styles.arrows}>
						<FontAwesomeIcon
							icon={faArrowLeft}
							onClick={handlePrevious}
						/>
						<FontAwesomeIcon
							icon={faArrowRight}
							onClick={handleNext}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
