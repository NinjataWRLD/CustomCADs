import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchFile } from '../file';

interface Case {
	url: string;
	contentType: string;
}

const base_url = 'https://customcads-bucket.s3.amazonaws.com';
const cadCase = {
	url: `${base_url}/cads/cad.glb`,
	contentType: 'model/gltf-binary',
};
const imageCase = {
	url: `${base_url}/images/image.png`,
	contentType: 'image/png',
};
const cases: Case[][] = [[cadCase], [imageCase]];

describe('Fetch File utility tests', () => {
	let mockBlob: Blob;
	const mockFetch = (
		contentType: string,
		responseData: unknown,
		throwError = false,
	) => {
		global.fetch = vi.fn().mockResolvedValueOnce({
			ok: true,
			status: throwError ? 500 : 200,
			headers: { get: () => contentType },
			blob: () =>
				throwError
					? Promise.reject(new Error(responseData as string))
					: Promise.resolve(responseData),
		});
	};

	beforeEach(() => {
		mockBlob = new Blob([new ArrayBuffer(8)]);
	});

	it.each(cases)('makes proper call to fetch', async (file) => {
		// Arrange
		mockFetch(file.contentType, mockBlob);

		// Act
		await fetchFile(file.url, file.contentType);

		// Assert
		expect(global.fetch).toHaveBeenCalledWith(file.url, {
			headers: {
				'Content-Type': file.contentType,
			},
		});
	});

	it.each(cases)('returns Blob when fetch is successful', async (file) => {
		// Arrange
		mockFetch(file.contentType, mockBlob);

		// Act
		const result = await fetchFile(file.url, file.contentType);

		// Assert
		expect(result).toEqual(mockBlob);
	});

	it.each(cases)(
		'returns non-Blob when fetch is successful',
		async (file) => {
			// Arrange
			const message = 'Not a Blob';
			mockFetch(file.contentType, message);

			// Act
			const result = await fetchFile(file.url, file.contentType);

			// Assert
			expect(result).toEqual(message);
		},
	);

	it.each(cases)(
		'propagates error properly when fetch rejects',
		async (file) => {
			// Arrange
			const error = new Error('Fetch failed');
			global.fetch = vi.fn().mockRejectedValueOnce(error);

			// Act + Assert
			await expect(fetchFile(file.url, file.contentType)).rejects.toThrow(
				error.message,
			);
		},
	);

	it.each(cases)(
		'throws proper errors when fetch is unsuccessful',
		async (file) => {
			// Arrange
			global.fetch = vi.fn().mockResolvedValueOnce({
				ok: false,
				status: 404,
				statusText: 'Not Found',
			});

			// Act + Arrange
			await expect(fetchFile(file.url, file.contentType)).rejects.toThrow(
				'Network response was not ok: 404 Not Found',
			);
		},
	);

	it.each(cases)('throws proper errors when blob() fails', async (file) => {
		// Arrange
		const message = 'RangeError: Invalid typed array length: 4';
		mockFetch(file.contentType, message, true);

		// Act + Arrange
		await expect(fetchFile(file.url, file.contentType)).rejects.toThrow(
			message,
		);
	});
});
