import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faApplePay,
	faCcMastercard,
	faCcVisa,
	faGooglePay,
} from '@fortawesome/free-brands-svg-icons';
import useCartContext from '@/hooks/contexts/useCartContext';
import Transition from '@/app/components/transition/transition';
import BtnLink from '@/app/components/button/button';
import CartItem from './components/cart-item';
import styles from './styles.module.css';
import { useCartTranslation } from '@/hooks/locales/pages/public';

const Cart = () => {
	const { items, dispatch } = useCartContext();
	const tCart = useCartTranslation();

	const totalCount = items.length;
	const totalDeliveryCount = items.filter((i) => i.forDelivery).length;

	const removeItem = (id: string) => {
		dispatch({ type: 'REMOVE_ITEM', id: id });
	};

	const incrementQuantity = (productId: string) => {
		dispatch({ type: 'INCREMENT_QUANTITY', id: productId });
	};

	const decrementQuantity = (productId: string) => {
		dispatch({ type: 'DECREMENT_QUANTITY', id: productId });
	};

	const toggleDelivery = (productId: string) => {
		dispatch({ type: 'TOGGLE_DELIVERY', id: productId });
	};

	return (
		<Transition>
			<div className={styles.container}>
				<h1>{tCart('title')}</h1>
				<div className={styles.purchases}>
					{items.map((item) => (
						<CartItem
							key={item.productId}
							item={item}
							removeItem={removeItem}
							incrementQuantity={incrementQuantity}
							decrementQuantity={decrementQuantity}
							toggleDelivery={toggleDelivery}
						/>
					))}
				</div>
			</div>
			<div className={styles.options}>
				<h2>
					<p>{tCart('total', { count: totalCount, cost: '$20' })}</p>
					<p>
						{tCart('total-delivery', {
							count: totalDeliveryCount,
							cost: '$3',
						})}
					</p>
				</h2>
				<BtnLink text={tCart('buy')}></BtnLink>
				<hr />
				<div className={styles.cards}>
					<FontAwesomeIcon icon={faCcVisa} />
					<FontAwesomeIcon icon={faCcMastercard} />
					<FontAwesomeIcon icon={faGooglePay} />
					<FontAwesomeIcon icon={faApplePay} />
				</div>
			</div>
		</Transition>
	);
};

export default Cart;
