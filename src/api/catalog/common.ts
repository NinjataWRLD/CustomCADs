export type Counts = { purchases: number; views: number };
export type Coordinates = { x: number; y: number; z: number };

export type CategoryDto = { id: number; name: string };
export type CategoryResponse = CategoryDto & { description: string };

export const CATEGORY_BASE_PATH = '/categories';
export const TAG_BASE_PATH = '/tags';
const PRODUCT_BASE_PATH = '/products';

export const GALLERY_BASE_PATH = `${PRODUCT_BASE_PATH}/gallery`;
export const CREATOR_BASE_PATH = `${PRODUCT_BASE_PATH}/creator`;
export const DESIGNER_BASE_PATH = `${PRODUCT_BASE_PATH}/designer`;
