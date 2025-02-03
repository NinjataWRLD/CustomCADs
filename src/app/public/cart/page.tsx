import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faApplePay,
	faCcMastercard,
	faCcVisa,
	faGooglePay,
} from '@fortawesome/free-brands-svg-icons';
import useCartContext from '@/hooks/useCartContext';
import Transition from '@/app/components/transition/transition';
import BtnLink from '@/app/components/button/button';
import CartItem from './components/cart-item';
import styles from './styles.module.css';

const Cart = () => {
	const { items, dispatch } = useCartContext();
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
				<h1>Your cart</h1>
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
					<p>{totalCount} item/s total - $20</p>
					<p>{totalDeliveryCount} for delivery - $3</p>
				</h2>
				<BtnLink text='Buy Cart'></BtnLink>
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
