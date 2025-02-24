import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
	setColor,
	setInfill,
	setMaterial,
	setScale,
} from '@/stores/editor-store';
import { useOthersTranslation } from '@/hooks/locales/common/others';
import { useEditorTranslation } from '@/hooks/locales/pages/public';
import useEditorStore from '@/hooks/stores/useEditorStore';
import Transition from '@/app/components/transition';
import BtnLink from '@/app/components/button';
import Cad from '@/app/components/cad';
import RangeField from '@/app/components/fields/range';
import RadioField from '@/app/components/fields/radio';
import { Metric } from '@/types/threejs';
import { MATERIALS, INFILL, SCALE } from '@/constants/threejs';
import Menu from './menu';
import formatter from './formatter';
import styles from './styles.module.css';

const Editor = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { allow } = useLocation().state;

	const tOthers = useOthersTranslation();
	const tEditor = useEditorTranslation();

	const [metric, setMetric] = useState<Metric>('mm');

	const store = useEditorStore(id ?? '');
	if (!allow || !id) return;
	const { material, color, ratio, infill, scale, volume, weight, cost } =
		store;

	const back = () => navigate(`/gallery/${id}`);
	const reset = () => {
		setColor(id, '#ffffff');
		setMaterial(id, 'PLA');
		setInfill(id, 20);
		setMetric('mm');
		setScale(id, 100);
	};
	const next = () => navigate(`/cart`);

	return (
		<Transition>
			<div className={styles['viewer-page']}>
				<Cad id={String(id)} type='editor' />
				<div className={styles['material-section']}>
					<div>
						<Menu
							title={tEditor('title-1')}
							description={tEditor('description-1')}
						>
							<div
								className={`${styles.expanded} ${styles.fade}`}
							>
								{MATERIALS.map((option, i) => (
									<div
										key={i}
										onClick={() => setMaterial(id, option)}
										className={`${styles.fade} ${styles['sub-material']} ${styles['material-option']} ${material === option ? styles['material-option-active'] : ''}`}
									>
										{option}
									</div>
								))}
								<br />
								<label htmlFor='color'>
									{tOthers('color')}:
								</label>
								<input
									id='color'
									type='color'
									value={color}
									onChange={(e) =>
										setColor(id, e.target.value)
									}
								/>
								{color !== '#ffffff' && (
									<button
										onClick={() => setColor(id, '#ffffff')}
									>
										{tEditor('clear-color')}
									</button>
								)}
							</div>
						</Menu>
					</div>

					<div>
						<Menu
							title={tEditor('title-2')}
							description={tEditor('description-2')}
						>
							<div
								className={`${styles.expanded} ${styles.fade}`}
							>
								<RangeField
									id='infill'
									label={tOthers('infill')}
									min={INFILL.min}
									max={INFILL.max}
									value={infill}
									onChange={(e) =>
										setInfill(id, Number(e.target.value))
									}
									percentage
								/>
								{infill <= 30 ? '(Recommended)' : ''}
								<br />
								<RangeField
									id='scale'
									label={tOthers('scale')}
									min={SCALE.min}
									max={SCALE.max}
									value={scale}
									onChange={(e) =>
										setScale(id, Number(e.target.value))
									}
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
										value={'m'}
										checked={metric === 'm'}
										onChange={() => setMetric('m')}
										label={'m'}
									/>
									<RadioField
										value={'inch'}
										checked={metric === 'inch'}
										onChange={() => setMetric('inch')}
										label={'inch'}
									/>
								</div>
								<div>
									<p>{`${tOthers('width')}: ${formatter.size(ratio.x, scale / 100, metric)}`}</p>
									<p>{`${tOthers('height')}: ${formatter.size(ratio.y, scale / 100, metric)}`}</p>
									<p>{`${tOthers('length')}: ${formatter.size(ratio.z, scale / 100, metric)}`}</p>
									<p>{`${tOthers('volume')}: ${formatter.volume(volume, metric)}`}</p>
									<p>{`${tOthers('weight')}: ${formatter.weight(weight)}`}</p>
									<p>{`${tOthers('cost')}: ${formatter.cost(cost)}`}</p>
								</div>
							</div>
						</Menu>
					</div>

					<div className={styles.btn}>
						<BtnLink text={tEditor('back')} onClick={back} />
						<BtnLink text={tEditor('reset')} onClick={reset} />
						<BtnLink text={tEditor('next')} onClick={next} />
					</div>
				</div>
			</div>
		</Transition>
	);
};

export default Editor;
