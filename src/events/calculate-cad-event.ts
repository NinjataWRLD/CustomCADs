import { Ratio } from '@/types/threejs';

class CalculateCadEvent extends Event {
	density: number;
	ratio: Ratio;
	scale: number;
	infill: number;

	constructor(density: number, ratio: Ratio, scale: number, infill: number) {
		super('calculate-cad');
		this.density = density;
		this.ratio = ratio;
		this.scale = scale;
		this.infill = infill;
	}
}

export default CalculateCadEvent;
