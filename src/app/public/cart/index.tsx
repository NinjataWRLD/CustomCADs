import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faApplePay,
	faCcMastercard,
	faCcVisa,
	faGooglePay,
} from '@fortawesome/free-brands-svg-icons';
import { useCartTranslation } from '@/hooks/locales/pages/public';
import { useCartContext } from '@/hooks/contexts/useCartContext';
import Transition from '@/app/components/transition';
import Button from '@/app/components/button';
import CartItem from './item';
import * as formatter from './formatter';
import styles from './styles.module.css';

const Cart = () => {
	const { items } = useCartContext();
	const tCart = useCartTranslation();

	const [prices, setPrices] = useState<Record<string, number>>({});
	const [costs, setCosts] = useState<Record<string, number>>({});
	const sum = {
		product: { total: 0, delivery: 0 },
		customization: { total: 0, delivery: 0 },
	};

	Object.entries(prices).forEach(([id, price]) => {
		sum.product.total += price;
		const item = items?.find((i) => i.productId === id);
		if (item?.forDelivery) {
			sum.product.delivery += price;
		}
	});
	Object.entries(costs).forEach(([id, cost]) => {
		sum.customization.total += cost;
		const item = items?.find((i) => i.productId === id);
		if (item?.forDelivery) {
			sum.customization.delivery += cost;
		}
	});

	const totalPrice = sum.product.total + sum.customization.total;
	const deliveryPrice = sum.product.delivery + sum.customization.delivery;
	return (
		<Transition>
			<div className={styles.container}>
				<h1>{tCart('title')}</h1>
				<div className={styles.purchases}>
					{items?.map((item) => (
						<CartItem
							key={item.productId}
							item={item}
							reset={{
								price: () =>
									setPrices((prev) => ({
										...prev,
										[item.productId]: 0,
									})),
								cost: () =>
									setCosts((prev) => ({
										...prev,
										[item.productId]: 0,
									})),
							}}
							addTo={{
								price: (price) =>
									setPrices((prev) => ({
										...prev,
										[item.productId]:
											(prev[item.productId] ?? 0) + price,
									})),
								cost: (cost) =>
									setCosts((prev) => ({
										...prev,
										[item.productId]:
											(prev[item.productId] ?? 0) + cost,
									})),
							}}
						/>
					))}
				</div>
			</div>
			<div className={styles.options}>
				<h2>
					<p>
						{tCart('total', {
							count: items?.length,
							cost: formatter.price(totalPrice),
						})}
					</p>
					<p>
						{tCart('total-delivery', {
							count: items?.filter((i) => i.forDelivery).length,
							cost: formatter.price(deliveryPrice),
						})}
					</p>
				</h2>
				<Button type='button' text={tCart('buy')} />
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
