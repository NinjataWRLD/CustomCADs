import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faApplePay,
	faCcMastercard,
	faCcVisa,
	faGooglePay,
} from '@fortawesome/free-brands-svg-icons';
import { useCartTranslation } from '@/hooks/locales/pages/public';
import useCartContext from '@/hooks/contexts/useCartContext';
import Transition from '@/app/components/transition/transition';
import BtnLink from '@/app/components/button/button';
import CartItem from './components/cart-item';
import styles from './styles.module.css';

const Cart = () => {
	const { items } = useCartContext();
	const tCart = useCartTranslation();

	const totalCount = items.length;
	const totalDeliveryCount = items.filter((i) => i.forDelivery).length;

	return (
		<Transition>
			<div className={styles.container}>
				<h1>{tCart('title')}</h1>
				<div className={styles.purchases}>
					{items.map((item) => (
						<CartItem key={item.productId} item={item} />
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
