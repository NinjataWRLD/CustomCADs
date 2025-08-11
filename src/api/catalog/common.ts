export interface Counts {
	purchases: number;
	views: number;
}

export interface Coordinates {
	x: number;
	y: number;
	z: number;
}

export interface Category {
	id: number;
	name: string;
}

export interface CategoryResponse {
	id: number;
	name: string;
	description: string;
}

export const CATEGORY_BASE_PATH = '/categories';

export const TAG_BASE_PATH = '/tags';

const PRODUCT_BASE_PATH = '/products';

export const GALLERY_BASE_PATH = `${PRODUCT_BASE_PATH}/gallery`;

export const CREATOR_BASE_PATH = `${PRODUCT_BASE_PATH}/creator`;

export const DESIGNER_BASE_PATH = `${PRODUCT_BASE_PATH}/designer`;
