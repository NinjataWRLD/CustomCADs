import { CADS_BASE_PATH, Coordinates } from '../common';

export type Request = {
	id: string;
	camCoordinates: Coordinates;
	panCoordinates: Coordinates;
};

export const url = () => `${CADS_BASE_PATH}`;
