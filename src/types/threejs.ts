import * as THREE from 'three';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Mesh = THREE.Mesh<THREE.BufferGeometry, any>;

export type Ratio = { x: number; y: number; z: number };

export type Metric = 'mm' | 'cm' | 'inch';

export interface CustomizeCad {
	texture: string;
	color?: string;
}

export interface CalculateCad {
	volume: number;
	density: number;
	ratio: Ratio;
	scale: number;
	infill: number;
}
