import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import getTimezone from '../get-timezone';

describe('Get Timezone utility tests', () => {
	let originalResolvedOptions: () => Intl.ResolvedDateTimeFormatOptions;
	const mockResolvedOptions = (mockTimezone: string) => {
		vi.spyOn(
			Intl.DateTimeFormat.prototype,
			'resolvedOptions',
		).mockReturnValue({
			timeZone: mockTimezone,
			locale: '',
			calendar: '',
			numberingSystem: '',
		});
	};

	beforeEach(() => {
		originalResolvedOptions = Intl.DateTimeFormat().resolvedOptions;
	});

	afterEach(() => {
		Intl.DateTimeFormat().resolvedOptions = originalResolvedOptions;
	});

	it('should return a valid timezone string', () => {
		// Act
		const timezone = getTimezone();

		// Assert
		expect(typeof timezone).toBe('string');
		expect(timezone).toMatch(/^[A-Za-z_\/]+\/[A-Za-z_]+$/);
	});

	it('should return the correct timezone', () => {
		// Arrange
		const mockTimezone = 'America/New_York';
		mockResolvedOptions(mockTimezone);

		// Act
		const timezone = getTimezone();

		// Assert
		expect(timezone).toBe(mockTimezone);
	});
});
