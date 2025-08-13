import { useEffect, useState } from 'react';
import { Mass, Distance } from '@/types/threejs';
import { useOthersTranslation } from '@/hooks/locales/common/others';
import RangeField from '@/app/components/fields/range';
import RadioField from '@/app/components/fields/radio';
import { INFILL } from '@/constants/threejs';
import { useEditorStore } from '@/hooks/stores/useEditorStore';
import { setInfill, setScale } from '@/stores/editor-store';
import * as calculate3D from '@/utils/calculate-3D';
import * as money from '@/utils/money';
import * as formatter from '@/utils/formatters';

type CalculationsProps = {
	id: string;
	volume: number;
};

const Calculations = ({ id, volume }: CalculationsProps) => {
	const [distance, setDistance] = useState<Distance>('mm');
	const [mass, setMass] = useState<Mass>('g');

	const { infill, scale, size, weight, cost } = useEditorStore(id);
	const ratio = calculate3D.baseRatio(size);

	const tOthers = useOthersTranslation();
	const unrecommended = (
		<>
			<br />({tOthers('unrecommended')})
		</>
	);

	const [fadeIn, setFadeIn] = useState(false);

	useEffect(() => {
		const styleEl = document.createElement('style');
		styleEl.textContent = `
			  .fade-in {
					opacity: 0;
					transform: translateY(100px);
					animation: fadeIn 0.5s ease-in-out forwards;
				}

				@keyframes fadeIn {
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
			`;
		document.head.appendChild(styleEl);

		setFadeIn(true);

		return () => {
			document.head.removeChild(styleEl);
		};
	}, []);

	return (
		<div
			className={`py-2.5 px-4 bg-blue-200 rounded-b-lg border-t-0 border-2 border-purple-500 mb-2.5 opacity-0 ${fadeIn ? 'fade-in' : ''}`}
		>
			<RangeField
				id='infill'
				label={tOthers('infill')}
				min={INFILL.min}
				max={INFILL.max}
				value={infill}
				text={formatter.percentage(infill * 100)}
				onChange={(e) => setInfill(id, e.target.valueAsNumber)}
			/>
			{infill > 0.3 && unrecommended}
			<br />
			<RangeField
				id='scale'
				label={tOthers('scale')}
				min={1}
				max={calculate3D.getMaxRatio(ratio)}
				value={scale}
				text={formatter.percentage(scale * 100)}
				onChange={(e) => setScale(id, e.target.valueAsNumber)}
			/>
			<br />
			<div>
				<RadioField
					name='distance'
					value='mm'
					checked={distance === 'mm'}
					onChange={() => setDistance('mm')}
					label='mm'
				/>
				<RadioField
					name='distance'
					value='cm'
					checked={distance === 'cm'}
					onChange={() => setDistance('cm')}
					label='cm'
				/>
				<RadioField
					name='distance'
					value='inch'
					checked={distance === 'inch'}
					onChange={() => setDistance('inch')}
					label='inch'
				/>
			</div>
			<br />
			<div>
				<RadioField
					name='mass'
					value='g'
					checked={mass === 'g'}
					onChange={() => setMass('g')}
					label='g'
				/>
				<RadioField
					name='mass'
					value='kg'
					checked={mass === 'kg'}
					onChange={() => setMass('kg')}
					label='kg'
				/>
				<RadioField
					name='mass'
					value='lbs'
					checked={mass === 'lbs'}
					onChange={() => setMass('lbs')}
					label='lbs'
				/>
			</div>
			<div>
				<p>{`${tOthers('width')}: ${formatter.size(ratio.x * scale, distance)}`}</p>
				<p>{`${tOthers('height')}: ${formatter.size(ratio.y * scale, distance)}`}</p>
				<p>{`${tOthers('length')}: ${formatter.size(ratio.z * scale, distance)}`}</p>
				<p>{`${tOthers('volume')}: ${formatter.volume(volume, distance)}`}</p>
				<p>{`${tOthers('weight')}: ${formatter.weight(weight, mass)}`}</p>
				<p>{`${tOthers('cost')}: ${money.format(money.fromBase({ money: cost }))}`}</p>
			</div>
		</div>
	);
};

export default Calculations;
