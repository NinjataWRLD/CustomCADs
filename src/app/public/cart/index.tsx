import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faApplePay,
	faCcMastercard,
	faCcVisa,
	faGooglePay,
} from '@fortawesome/free-brands-svg-icons';
import { useMoneyManager } from '@/hooks/useMoneyManager';
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

	const { money: prices, setMoney: setPrice } = useMoneyManager();
	const { money: costs, setMoney: setCost } = useMoneyManager();

	const calculate = (money: Record<string, number>) => {
		let total = 0;
		let delivery = 0;

		Object.entries(money).forEach(([id, price]) => {
			total += price;
			if (items?.find((i) => i.productId === id)?.forDelivery) {
				delivery += price;
			}
		});

		return { total, delivery };
	};

	const sum = {
		product: calculate(prices),
		customization: calculate(costs),
	};
	const total = sum.product.total + sum.customization.total;
	const delivery = sum.product.delivery + sum.customization.delivery;

	return (
		<Transition>
			<div className={styles.container}>
				<h1>{tCart('title')}</h1>
				<div className={styles.purchases}>
					{items?.map((item) => (
						<CartItem
							key={item.productId}
							item={item}
							set={{
								cost: (cost, accumulate?: boolean) =>
									setCost({
										id: item.productId,
										set: (prev) =>
											accumulate ? prev + cost : cost,
									}),
								price: (price, accumulate?: boolean) =>
									setPrice({
										id: item.productId,
										set: (prev) =>
											accumulate ? prev + price : price,
									}),
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
							cost: formatter.price(total),
						})}
					</p>
					<p>
						{tCart('total-delivery', {
							count: items?.filter((i) => i.forDelivery).length,
							cost: formatter.price(delivery),
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
