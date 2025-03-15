import { useState } from 'react';
import { Metric } from '@/types/threejs';
import { useOthersTranslation } from '@/hooks/locales/common/others';
import RangeField from '@/app/components/fields/range';
import RadioField from '@/app/components/fields/radio';
import { INFILL, SCALE } from '@/constants/threejs';
import { useEditorStore } from '@/hooks/stores/useEditorStore';
import { setInfill, setScale } from '@/stores/editor-store';
import * as calculate3D from '@/utils/calculate-3D';
import * as formatter from '../formatter';
import styles from '../styles.module.css';

interface CalculationsProps {
	id: string;
	volume: number;
}

const Calculations = ({ id, volume }: CalculationsProps) => {
	const [metric, setMetric] = useState<Metric>('mm');
	const { infill, scale, size, weight, cost } = useEditorStore(id);
	const ratio = calculate3D.baseRatio(size);

	const tOthers = useOthersTranslation();
	const unrecommended = (
		<>
			<br />({tOthers('unrecommended')})
		</>
	);

	return (
		<div className={`${styles.expanded} ${styles.fade}`}>
			<RangeField
				id='infill'
				label={tOthers('infill')}
				min={INFILL.min}
				max={INFILL.max}
				value={infill}
				onChange={(e) => setInfill(id, e.target.valueAsNumber)}
				percentage
			/>
			{infill > 30 && unrecommended}
			<br />
			<RangeField
				id='scale'
				label={tOthers('scale')}
				min={SCALE.min}
				max={SCALE.max}
				value={scale}
				onChange={(e) => setScale(id, e.target.valueAsNumber)}
				percentage
			/>
			<br />
			<div>
				<RadioField
					value={'mm'}
					checked={metric === 'mm'}
					onChange={() => setMetric('mm')}
					label={'mm'}
				/>
				<RadioField
					value={'cm'}
					checked={metric === 'cm'}
					onChange={() => setMetric('cm')}
					label={'cm'}
				/>
				<RadioField
					value={'inch'}
					checked={metric === 'inch'}
					onChange={() => setMetric('inch')}
					label={'inch'}
				/>
			</div>
			<div>
				<p>{`${tOthers('width')}: ${formatter.size((ratio.x * scale) / 100, metric)}`}</p>
				<p>{`${tOthers('height')}: ${formatter.size((ratio.y * scale) / 100, metric)}`}</p>
				<p>{`${tOthers('length')}: ${formatter.size((ratio.z * scale) / 100, metric)}`}</p>
				<p>{`${tOthers('volume')}: ${formatter.volume(volume, metric)}`}</p>
				<p>{`${tOthers('weight')}: ${formatter.weight(weight)}`}</p>
				<p>{`${tOthers('cost')}: ${formatter.cost(cost)}`}</p>
			</div>
		</div>
	);
};

export default Calculations;
