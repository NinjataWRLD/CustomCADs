import * as THREE from 'three';

export type Cad = THREE.Group;

export type Ratio = { x: number; y: number; z: number };

export type Distance = 'mm' | 'cm' | 'inch';
export type Mass = 'g' | 'kg' | 'lbs';

export type CustomizeCad = {
	texture: string;
	color?: string;
};

export type CalculateCad = {
	volume: number;
	density: number;
	euroPerKg: number;
	size: Ratio;
	scale: number;
	infill: number;
};
