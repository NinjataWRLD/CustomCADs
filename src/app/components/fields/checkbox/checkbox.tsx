import { ChangeEventHandler, CSSProperties } from 'react';
import styles from './checkbox.module.css';

interface CheckboxProps {
	id: string;
	label: string;
	checked: boolean;
	onClick: ChangeEventHandler<HTMLInputElement>;
	style?: CSSProperties;
}

const Checkbox = ({ id, label, checked, onClick, style }: CheckboxProps) => {
	return (
		<div className={styles.checkbox} style={style}>
			<input
				id={id}
				type='checkbox'
				checked={checked}
				onChange={onClick}
			/>
			<label htmlFor={id}>
				<span>{label}</span>
			</label>
		</div>
	);
};

export default Checkbox;
