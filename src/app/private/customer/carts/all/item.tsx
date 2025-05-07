import { UseNavigateResult } from '@tanstack/react-router';
import { PurchasedCartItem } from '@/api/carts/common';
import * as money from '@/utils/money';
import * as dateTime from '@/utils/date-time';
import styles from './styles.module.css';

interface ItemProps {
	item: PurchasedCartItem;
	navigate: UseNavigateResult<'/carts'>;
}
const Item = ({ item: { addedAt, cost, quantity }, navigate }: ItemProps) => (
	<>
		<span>|</span>
		<div onClick={() => navigate({ to: '/' })} className={styles.item}>
			<p>{dateTime.format({ date: addedAt })}</p>
			<p>{money.format(money.fromBase({ money: cost * quantity }))}</p>
		</div>
		<span>|</span>
	</>
);

export default Item;
