import { afterEach, describe, expect, it, Mock, vi } from 'vitest';
import { axios, config } from '@/api/axios';
import * as categories from './index';
import * as allResources from './all';
import * as singleResources from './single';
import * as createResources from './create';
import * as editResources from './edit';
import * as deleteResources from './delete';
import { CategoryResponse } from '../common';

vi.mock('@/api/axios');

const category: CategoryResponse = {
	id: 1,
	name: 'Category 1',
	description: 'Description 1',
};

describe('Categories API tests', () => {
	const mockAxios = {
		get: (response: object) =>
			(axios.get as Mock).mockResolvedValue({ data: response }),
		post: (response: object) =>
			(axios.post as Mock).mockResolvedValue({ data: response }),
		put: () => (axios.put as Mock).mockResolvedValueOnce({ data: null }),
		delete: () =>
			(axios.delete as Mock).mockResolvedValueOnce({ data: null }),
	};

	afterEach(() => {
		vi.clearAllMocks();
	});

	it('should fetch all categories', async () => {
		// Arrange
		const mockResponse: CategoryResponse[] = [category];
		mockAxios.get(mockResponse);

		// Act
		const result = await categories.all();

		// Assert
		expect(axios.get).toHaveBeenCalledWith(allResources.url());
		expect(result.data).toEqual(mockResponse);
	});

	it('should fetch a single category', async () => {
		// Arrange
		mockAxios.get(category);

		// Act
		const request: singleResources.Request = { id: 1 };
		const result = await categories.single(request);

		// Assert
		expect(axios.get).toHaveBeenCalledWith(singleResources.url(request));
		expect(result.data).toEqual(category);
	});

	it('should create a new category', async () => {
		// Arrange
		const request: createResources.Request = {
			idempotencyKey: 'mock-idempotency-key',
			name: category.name,
			description: category.description,
		};
		mockAxios.post(category);

		// Act
		const result = await categories.create(request);

		// Assert
		expect(axios.post).toHaveBeenCalledWith(
			createResources.url(),
			request,
			config({ idempotencyKey: request.idempotencyKey }),
		);
		expect(result.data).toEqual(category);
	});

	it('should edit an existing category', async () => {
		// Arrange
		const request: editResources.Request = {
			id: category.id,
			name: category.name,
			description: category.description,
		};
		mockAxios.put();

		// Act
		await categories.edit(request);

		// Assert
		expect(axios.put).toHaveBeenCalledWith(editResources.url(), request);
	});

	it('should delete a category', async () => {
		// Arrange
		const request: deleteResources.Request = { id: category.id };
		mockAxios.delete();

		// Act
		await categories.delete_(request);

		// Assert
		expect(axios.delete).toHaveBeenCalledWith(
			deleteResources.url(),
			config({
				data: request,
			}),
		);
	});
});
