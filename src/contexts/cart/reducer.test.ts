import { describe, expect, it } from 'vitest';
import { CartItem } from '@/types/cart-item';
import cartReducer from './reducer';
import CartAction from './action';

describe('Cart Reducer tests', () => {
	it('should add an item to the cart', () => {
		const initialState: CartItem[] = [];
		const newItem: CartItem = {
			productId: '123',
			quantity: 1,
			weight: 2,
			forDelivery: true,
		};

		const action: CartAction = { type: 'ADD_ITEM', item: newItem };
		const newState = cartReducer(initialState, action);

		expect(newState).toEqual([newItem]);
	});

	it('should increment quantity for an existing item', () => {
		const initialState: CartItem[] = [
			{ productId: '123', quantity: 1, weight: 2, forDelivery: true },
		];
		const action: CartAction = { type: 'INCREMENT_QUANTITY', id: '123' };

		const newState = cartReducer(initialState, action);

		expect(newState[0].quantity).toBe(2);
	});

	it('should decrement quantity for an existing item', () => {
		const initialState: CartItem[] = [
			{ productId: '123', quantity: 2, weight: 2, forDelivery: true },
		];
		const action: CartAction = { type: 'DECREMENT_QUANTITY', id: '123' };

		const newState = cartReducer(initialState, action);

		expect(newState[0].quantity).toBe(1);
	});

	it('should not decrement quantity below 1', () => {
		const initialState: CartItem[] = [
			{ productId: '123', quantity: 1, weight: 2, forDelivery: true },
		];
		const action: CartAction = { type: 'DECREMENT_QUANTITY', id: '123' };

		const newState = cartReducer(initialState, action);

		expect(newState[0].quantity).toBe(1);
	});

	it('should toggle delivery for an existing item', () => {
		const initialState: CartItem[] = [
			{ productId: '123', quantity: 1, weight: 2, forDelivery: true },
		];
		const action: CartAction = { type: 'TOGGLE_DELIVERY', id: '123' };

		const newState = cartReducer(initialState, action);

		expect(newState[0].forDelivery).toBe(false);
	});

	it('should set weight for an existing item', () => {
		const initialState: CartItem[] = [
			{ productId: '123', quantity: 1, weight: 2, forDelivery: true },
		];
		const action: CartAction = { type: 'SET_WEIGHT', id: '123', weight: 3 };

		const newState = cartReducer(initialState, action);

		expect(newState[0].weight).toBe(3);
	});

	it('should fill the cart with provided items', () => {
		const initialState: CartItem[] = [];
		const items: CartItem[] = [
			{ productId: '123', quantity: 1, weight: 2, forDelivery: true },
			{ productId: '456', quantity: 1, weight: 3, forDelivery: false },
		];
		const action: CartAction = { type: 'FILL_CART', items };

		const newState = cartReducer(initialState, action);

		expect(newState).toEqual(items);
	});

	it('should remove an item from the cart', () => {
		const initialState: CartItem[] = [
			{ productId: '123', quantity: 1, weight: 2, forDelivery: true },
			{ productId: '456', quantity: 1, weight: 3, forDelivery: false },
		];
		const action: CartAction = { type: 'REMOVE_ITEM', id: '123' };

		const newState = cartReducer(initialState, action);

		expect(newState).toEqual([
			{ productId: '456', quantity: 1, weight: 3, forDelivery: false },
		]);
	});

	it('should clear the cart', () => {
		const initialState: CartItem[] = [
			{ productId: '123', quantity: 1, weight: 2, forDelivery: true },
			{ productId: '456', quantity: 1, weight: 3, forDelivery: false },
		];
		const action: CartAction = { type: 'CLEAR_CART' };

		const newState = cartReducer(initialState, action);

		expect(newState).toEqual([]);
	});
});
