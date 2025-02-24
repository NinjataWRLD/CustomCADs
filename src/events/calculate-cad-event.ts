import { Material, Ratio } from '@/types/threejs';

class CalculateCadEvent extends Event {
	material: Material;
	ratio: Ratio;
	scale: number;
	infill: number;

	constructor(
		material: Material,
		ratio: Ratio,
		scale: number,
		infill: number,
	) {
		super('calculate-cad');
		this.material = material;
		this.ratio = ratio;
		this.scale = scale;
		this.infill = infill;
	}
}

export default CalculateCadEvent;
