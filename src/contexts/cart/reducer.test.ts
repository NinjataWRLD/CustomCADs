import { describe, expect, it } from 'vitest';
import { CartItem } from '@/types/cart-item';
import { cartReducer } from './reducer';
import { CartAction } from './action';

const item1: CartItem = {
	forDelivery: true,
	productId: '123',
	quantity: 1,
	customizationId: '456',
};
const item2: CartItem = {
	forDelivery: false,
	productId: '789',
};

describe('Cart Reducer tests', () => {
	it('should add an item to the cart', () => {
		const initialState: CartItem[] = [];

		const action: CartAction = { type: 'ADD_ITEM', item: item1 };
		const newState = cartReducer(initialState, action);

		expect(newState).toEqual([item1]);
	});

	it('should increment quantity for an existing item', () => {
		const initialState: CartItem[] = [item1];
		const action: CartAction = { type: 'INCREMENT_QUANTITY', id: '123' };

		const [item] = cartReducer(initialState, action)!;

		if (item.forDelivery) expect(item.quantity).toBe(2);
	});

	it('should decrement quantity for an existing item', () => {
		const initialState: CartItem[] = [{ ...item1, quantity: 2 }];
		const action: CartAction = { type: 'DECREMENT_QUANTITY', id: '123' };

		const [item] = cartReducer(initialState, action)!;

		if (item.forDelivery) expect(item.quantity).toBe(1);
	});

	it('should not decrement quantity below 1', () => {
		const initialState: CartItem[] = [item1];
		const action: CartAction = {
			type: 'DECREMENT_QUANTITY',
			id: item1.productId,
		};

		const [item] = cartReducer(initialState, action)!;

		if (item.forDelivery) expect(item.quantity).toBe(1);
	});

	it('should set no delivery for an existing item with delivery', () => {
		const initialState: CartItem[] = [item1];
		const action: CartAction = {
			type: 'SET_NO_DELIVERY',
			id: item1.productId,
		};

		const newState = cartReducer(initialState, action)!;

		expect(newState[0].forDelivery).toBe(false);
	});

	it('should set no delivery for an existing item with delivery', () => {
		const initialState: CartItem[] = [item2];
		const action: CartAction = {
			type: 'SET_FOR_DELIVERY',
			id: item2.productId,
			customizationId: item1.customizationId,
		};

		const newState = cartReducer(initialState, action)!;

		expect(newState[0].forDelivery).toBe(true);
	});

	it('should fill the cart with provided items', () => {
		const initialState: CartItem[] = [];
		const items: CartItem[] = [item1, item2];
		const action: CartAction = { type: 'FILL_CART', items };

		const newState = cartReducer(initialState, action);

		expect(newState).toEqual(items);
	});

	it('should remove an item from the cart', () => {
		const initialState: CartItem[] = [item1, item2];
		const action: CartAction = { type: 'REMOVE_ITEM', id: item1.productId };

		const newState = cartReducer(initialState, action);

		expect(newState).toEqual([item2]);
	});

	it('should clear the cart', () => {
		const initialState: CartItem[] = [item1, item2];
		const action: CartAction = { type: 'CLEAR_CART' };

		const newState = cartReducer(initialState, action);

		expect(newState).toEqual([]);
	});
});
