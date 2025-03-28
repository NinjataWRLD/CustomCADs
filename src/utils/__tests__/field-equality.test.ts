import { beforeEach, describe, expect, it } from 'vitest';
import { equalityHelper } from '../form';

describe('Field Equality Helper utility tests', () => {
	let helper: ReturnType<typeof equalityHelper>;

	beforeEach(() => {
		helper = equalityHelper();
	});

	it('sync method should return true', () => {
		// Act
		const result = helper.sync('test');

		// Assert
		expect(result).toBe(true);
	});

	it.each([{ input: 'test' }, { input: 'different' }])(
		'check method should return correctly when input is $input',
		({ input }) => {
			// Arrange
			const expected = 'test';
			helper.sync(expected);

			// Act
			const result = helper.check(input);

			// Assert
			expect(result).toBe(input === expected);
		},
	);
});
