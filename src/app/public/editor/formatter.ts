import { Metric } from '@/types/threejs';

const MM_PER_UNIT: Record<Metric, number> = {
	mm: 1,
	cm: 10,
	inch: 25.4,
};

const POINT_PER_UNIT: Record<Metric, number> = {
	mm: 1,
	cm: 4,
	inch: 4,
};

const formatter = {
	size: (size: number, metric: Metric) => {
		const value = parseFloat(
			(size / MM_PER_UNIT[metric]).toFixed(POINT_PER_UNIT[metric]),
		);
		return `${value} ${metric}`;
	},

	volume: (volume: number, metric: Metric) => {
		const value = parseFloat(
			(volume / MM_PER_UNIT[metric] ** 3).toFixed(POINT_PER_UNIT[metric]),
		);
		return `${value} ${metric}³`;
	},

	weight: (weight: number) => {
		const value = parseFloat((weight / 1000).toFixed(3));
		return `${value} kg`;
	},

	cost: (cost: number) => {
		const value = parseFloat(cost.toFixed(2));
		return `${value}$`;
	},
};

export default formatter;
