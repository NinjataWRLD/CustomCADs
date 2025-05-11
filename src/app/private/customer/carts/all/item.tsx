import { UseNavigateResult } from '@tanstack/react-router';
import { PurchasedCartItem } from '@/api/carts/common';
import * as money from '@/utils/money';
import * as dateTime from '@/utils/date-time';

interface ItemProps {
	item: PurchasedCartItem;
	navigate: UseNavigateResult<'/carts'>;
}
const Item = ({ item: { addedAt, cost, quantity }, navigate }: ItemProps) => (
	<>
		<span className='text-[rgba(184,92,184,0.468)]'>|</span>
		<div
			onClick={() => navigate({ to: '/' })}
			className='flex flex-col items-center gap-2.5 cursor-pointer transition-[color] duration-[0.3s] ease-linear hover:text-[gray]'
		>
			<p className='font-bold m-0 p-0'>
				{dateTime.format({ date: addedAt })}
			</p>
			<p className='font-bold m-0 p-0'>
				{money.format(money.fromBase({ money: cost * quantity }))}
			</p>
		</div>
		<span className='text-[rgba(184,92,184,0.468)]'>|</span>
	</>
);

export default Item;
