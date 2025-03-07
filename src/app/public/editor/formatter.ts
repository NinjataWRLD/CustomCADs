import { Metric } from '@/types/threejs';

const MM_PER_UNIT: Record<Metric, number> = {
	mm: 1,
	cm: 10,
	m: 1000,
	inch: 25.4,
};

const formatter = {
	size: (size: number, scale: number, metric: Metric) =>
		`${parseFloat(((size * scale) / MM_PER_UNIT[metric]).toFixed(3))} ${metric}`,

	volume: (volume: number, scale: number, metric: Metric) =>
		`${parseFloat(((volume * scale ** 3) / MM_PER_UNIT[metric] ** 3).toFixed(6))} ${metric}³`,

	weight: (weight: number) => `${parseFloat((weight / 1000).toFixed(5))} kg`,

	cost: (cost: number) => `${parseFloat(cost.toFixed(2))}$`,
};

export default formatter;
