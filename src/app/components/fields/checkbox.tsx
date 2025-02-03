import { ChangeEventHandler } from 'react';
import styles from './checkbox.module.css';

interface CheckboxProps {
	id: string;
	label: string;
	checked: boolean;
	onClick: ChangeEventHandler<HTMLInputElement>;
}

const Checkbox = ({ id, label, checked, onClick }: CheckboxProps) => {
	return (
		<div className={styles.checkbox}>
			<input
				id={id}
				type='checkbox'
				onChange={onClick}
				checked={checked}
			/>
			<label htmlFor={id}>
				<span>{label}</span>
			</label>
		</div>
	);
};

export default Checkbox;
