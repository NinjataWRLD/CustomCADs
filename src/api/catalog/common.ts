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

export const TAG_BASE_PATH = '/tags';

export const GALLERY_BASE_PATH = '/products/gallery';

export const CREATOR_BASE_PATH = '/products/creator';

export const DESIGNER_BASE_PATH = '/products/designer';
