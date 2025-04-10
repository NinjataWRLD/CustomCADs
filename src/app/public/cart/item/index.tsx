import { CartItem as Item } from '@/types/cart-item';
import CartItemWithoutDelivery from './no-delivery';
import CartItemForDelivery from './for-delivery';

interface CartItemProps {
	item: Item;
	set: {
		price: (val: number, accumulate?: boolean) => void;
		cost: (val: number, accumulate?: boolean) => void;
	};
}

const CartItem = ({ item, set }: CartItemProps) => {
	const price = {
		reset: () => set.price(0),
		addTo: (price: number) => set.price(price, true),
	};
	if (!item.forDelivery)
		return (
			<CartItemWithoutDelivery
				key={item.productId}
				item={item}
				resetPrice={price.reset}
				addToPrice={price.addTo}
			/>
		);

	const cost = {
		reset: () => set.cost(0),
		addTo: (cost: number) => set.cost(cost, true),
	};
	return (
		<CartItemForDelivery
			key={item.productId}
			item={item}
			reset={{
				price: price.reset,
				cost: cost.reset,
			}}
			addTo={{
				price: price.addTo,
				cost: cost.addTo,
			}}
		/>
	);
};

export default CartItem;
