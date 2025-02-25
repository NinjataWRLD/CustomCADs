import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faApplePay,
	faCcMastercard,
	faCcVisa,
	faGooglePay,
} from '@fortawesome/free-brands-svg-icons';
import { useCartTranslation } from '@/hooks/locales/pages/public';
import useCartContext from '@/hooks/contexts/useCartContext';
import Transition from '@/app/components/transition';
import BtnLink from '@/app/components/button';
import CartItem from './item';
import formatter from './formatter';
import styles from './styles.module.css';

const Cart = () => {
	const { items } = useCartContext();
	const tCart = useCartTranslation();
	const [cost, setCost] = useState({ total: 0, delivery: 0 });

	const totalCount = items.length;
	const addToTotalCost = (amount: number) =>
		setCost((prev) => ({ ...prev, total: prev.total + amount }));

	const totalDeliveryCount = items.filter((i) => i.forDelivery).length;
	const addToDeliveryCost = (amount: number) =>
		setCost((prev) => ({ ...prev, delivery: prev.delivery + amount }));

	return (
		<Transition>
			<div className={styles.container}>
				<h1>{tCart('title')}</h1>
				<div className={styles.purchases}>
					{items.map((item) => (
						<CartItem
							key={item.productId}
							item={item}
							addToCost={{
								total: addToTotalCost,
								delivery: addToDeliveryCost,
							}}
						/>
					))}
				</div>
			</div>
			<div className={styles.options}>
				<h2>
					<p>
						{tCart('total', {
							count: totalCount,
							cost: formatter.price(cost.total),
						})}
					</p>
					<p>
						{tCart('total-delivery', {
							count: totalDeliveryCount,
							cost: formatter.price(cost.delivery),
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
