export type ImageResponse = {
	id: string;
	key: string;
	contentType: string;
	ownerName: string;
};

export type Coordinates = { x: number; y: number; z: number };
export type CadResponse = {
	id: string;
	key: string;
	contentType: string;
	volume: number;
	camCoordinates: Coordinates;
	panCoordinates: Coordinates;
	ownerName: string;
};

export const IMAGES_BASE_PATH = '/images';
export const CADS_BASE_PATH = '/cads';
