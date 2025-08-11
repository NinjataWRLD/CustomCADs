import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchFile } from '../file';

interface Case {
	url: string;
}

const CONTENT_TYPE = 'file/content-type';
const base_url = 'https://customcads-bucket.s3.amazonaws.com';
const cadCase = {
	url: `${base_url}/cads/cad.glb`,
};
const imageCase = {
	url: `${base_url}/images/image.png`,
};
const cases: Case[][] = [[cadCase], [imageCase]];

describe('Fetch File utility tests', () => {
	const response = {
		ok: true,
		headers: {
			get: (key: string) => (key === 'Content-Type' ? CONTENT_TYPE : 256),
		},
	};
	const mockResult = { response, length: 256 };

	beforeEach(() => {
		global.fetch = vi.fn().mockResolvedValueOnce(response);
	});

	it.each(cases)('makes proper call to fetch', async (file) => {
		// Arrange
		// Act
		await fetchFile(file.url, CONTENT_TYPE);

		// Assert
		expect(global.fetch).toHaveBeenCalledWith(file.url, {
			headers: {
				'Content-Type': CONTENT_TYPE,
			},
		});
	});

	it.each(cases)('returns result when fetch is successful', async (file) => {
		// Arrange
		// Act
		const result = await fetchFile(file.url, CONTENT_TYPE);

		// Assert
		expect(result.length).toEqual(mockResult.length);
		expect(result.response).toEqual(mockResult.response);
	});

	it.each(cases)(
		'propagates error properly when fetch rejects',
		async (file) => {
			// Arrange
			const error = new Error('Fetch failed');
			global.fetch = vi.fn().mockRejectedValueOnce(error);

			// Act + Assert
			await expect(fetchFile(file.url, CONTENT_TYPE)).rejects.toThrow(
				error.message,
			);
		},
	);

	it.each(cases)(
		'throws proper errors when fetch is unsuccessful',
		async (file) => {
			// Arrange
			global.fetch = vi.fn().mockResolvedValueOnce({
				...response,
				ok: false,
				status: 404,
				statusText: 'Not Found',
			});

			// Act + Arrange
			await expect(fetchFile(file.url, CONTENT_TYPE)).rejects.toThrow(
				'Network response was not ok: 404 Not Found',
			);
		},
	);
});
