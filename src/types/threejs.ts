import * as THREE from 'three';

export type Cad = THREE.Group;

export type Ratio = { x: number; y: number; z: number };

export type Metric = 'mm' | 'cm' | 'inch';

export interface CustomizeCad {
	texture: string;
	color?: string;
}

export interface CalculateCad {
	volume: number;
	density: number;
	size: Ratio;
	scale: number;
	infill: number;
}
