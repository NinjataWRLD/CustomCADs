import { ChangeEvent } from 'react';
import styles from './styles.module.css';

interface RangeFieldProps {
	id: string;
	label: string;
	min: number;
	max: number;
	step?: number;
	value: number;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	style?: string;
	percentage?: boolean;
}

const RangeField = ({
	id,
	label,
	min,
	max,
	step = 1,
	value,
	onChange,
	style,
	percentage,
}: RangeFieldProps) => {
	return (
		<>
			<label htmlFor={id}>{label}</label>
			<input
				id={id}
				type='range'
				min={min}
				max={max}
				step={step}
				value={value}
				onChange={onChange}
				className={style ?? styles['input-range']}
			/>
			{value}
			{percentage ? '%' : ''}
		</>
	);
};

export default RangeField;
