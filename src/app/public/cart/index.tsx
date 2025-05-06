import { useEffect } from 'react';
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
import * as money from '@/utils/money';
import CartItem from './item';

const Cart = () => {
	const { items } = useCartContext();
	const tCart = useCartTranslation();

	useEffect(() => {
		const styleEl = document.createElement('style');
		styleEl.textContent = `
		  .purchases::-webkit-scrollbar {
    		  width: 8px;
		   }

		  .purchases::-webkit-scrollbar-thumb {
    		  background-color: #888;
    		  border-radius: 10px;
		   }

		  .purchases > * {
    		  flex: 0 0 auto;
		   }
		`;
		document.head.appendChild(styleEl);

		return () => {
			document.head.removeChild(styleEl);
		};
	}, []);

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
			<div className='relative h-[100dvh] flex flex-col justify-center text-white overflow-hidden'>
				<h1
					className='text-[2.3rem] ml-[10%]'
					style={{
						textShadow:
							'3px 3px 5px rgba(75, 0, 130, 0.5), -3px -3px 5px rgba(138, 43, 226, 0.4), 0px 0px 8px rgba(138, 43, 226, 0.8), 0px 0px 20px rgba(138, 43, 226, 0.6)',
					}}
				>
					{tCart('title')}
				</h1>
				<div
					className='purchases relative flex flex-1 flex-col gap-[30px] w-6/12 max-h-[70%] scroll-smooth ml-[10%] pr-2.5'
					style={{
						overflowY: items && items.length > 2 ? 'auto' : 'unset',
						scrollbarWidth: 'thin',
						scrollbarColor: '#aaa transparent',
					}}
				>
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
			<div className='absolute bg-[linear-gradient(to bottom, hsl(300, 88%, 10%), hsl(0, 0%, 0%))] w-[30%] text-[white] flex flex-col gap-2.5 justify-center items-center shadow-[0_3px_20px_hsla(0,0%,0%,0.8)] px-6 py-8 rounded-[10%] border-2 border-solid border-[hsl(297,14%,31%)] right-[5%] top-[20%]'>
				<h2>
					<p>
						{tCart('total', {
							count: items?.length,
							cost: money.format(
								money.fromBase({ money: total }),
							),
						})}
					</p>
					<p>
						{tCart('total-delivery', {
							count: items?.filter((i) => i.forDelivery).length,
							cost: money.format(
								money.fromBase({ money: delivery }),
							),
						})}
					</p>
				</h2>
				<Button type='button' text={tCart('buy')} />
				<hr />
				<div className='flex gap-[30px] w-full justify-center items-center h-[10%] text-white text-[2rem]'>
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
