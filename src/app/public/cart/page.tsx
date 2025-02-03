import useCartContext from '@/hooks/useCartContext';
import Transition from '@/app/components/transition/transition';
import CartItem from './components/cart-item';
import BtnLink from '@/app/components/button/button';
import styles from './styles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faApplePay,
	faCcMastercard,
	faCcVisa,
	faGooglePay,
} from '@fortawesome/free-brands-svg-icons';

const Cart = () => {
	const cart = useCartContext();
	const totalCount = cart.items.length;
	const totalDeliveryCount = cart.items.filter((i) => i.forDelivery).length;

	return (
		<Transition>
			<div className={styles.container}>
				<h1>Your cart</h1>
				<div className={styles.purchases}>
					{cart.items.map((i) => (
						<CartItem productId={i.productId} />
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
