import * as THREE from 'three';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Mesh = THREE.Mesh<THREE.BufferGeometry, any>;

export type Ratio = { x: number; y: number; z: number };

export type Material = 'PLA' | 'ABS' | 'TUF' | 'Glow in dark' | 'Wood';

export type Metric = 'mm' | 'cm' | 'm' | 'inch';
