import { describe, expect, it } from 'vitest';
import objectToSearchParams from '../object-to-search-params';

describe('Object to Search Params utility tests', () => {
	it('should convert a simple object to a URL query string', () => {
		const obj = { key1: 'value1', key2: 'value2' };
		const url = objectToSearchParams(obj);
		expect(url).toBe('key1=value1&key2=value2');
	});

	it('should handle empty objects', () => {
		const obj = {};
		const url = objectToSearchParams(obj);
		expect(url).toBe('');
	});

	it('should encode special characters', () => {
		const obj = { key: 'value with spaces', special: 'chars&symbols' };
		const url = objectToSearchParams(obj);
		expect(url).toBe('key=value+with+spaces&special=chars%26symbols');
	});

	it('should handle null and undefined values', () => {
		const obj = { key1: null, key2: undefined, key3: 'value3' };
		const url = objectToSearchParams(obj);
		expect(url).toBe('key3=value3');
	});

	it('should handle boolean values', () => {
		const obj = { key1: true, key2: false, key3: 'value3' };
		const url = objectToSearchParams(obj);
		expect(url).toBe('key1=true&key2=false&key3=value3');
	});

	it('should handle arrays as values', () => {
		const obj = { key: ['value1', 'value2'] };
		const url = objectToSearchParams(obj);
		expect(url).toBe('key=value1%2Cvalue2');
	});
});
