export interface MaterialResponse {
	id: number;
	name: string;
	density: number;
	cost: number;
}

export interface CustomizationResponse {
	id: string;
	scale: number;
	infill: number;
	volume: number;
	weight: number;
	cost: number;
	color: string;
	materialId: number;
}

export const CUSTOMIZATIONS_BASE_PATH = '/customizations';
export const MATERIALS_BASE_PATH = '/materials';
