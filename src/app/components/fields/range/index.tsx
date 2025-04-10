import { ChangeEvent } from 'react';
import styles from './styles.module.css';

interface RangeFieldProps {
	id: string;
	label: string;
	min: number;
	max: number;
	step?: number;
	value: number;
	text?: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	style?: string;
}

const RangeField = ({
	id,
	label,
	min,
	max,
	step = 0.00001,
	value,
	text,
	onChange,
	style,
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
			{text ?? value}
		</>
	);
};

export default RangeField;
