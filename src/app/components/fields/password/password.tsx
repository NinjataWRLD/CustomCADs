import { ChangeEventHandler, FocusEventHandler, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import styles from '@/styles/forms.module.css';

interface PasswordFieldProps {
	name: string;
	value?: string;
	onBlur: FocusEventHandler<HTMLInputElement>;
	onChange: ChangeEventHandler<HTMLInputElement>;
	placeholder: string;
	errors: unknown[];
}

const PasswordField = ({
	name,
	value,
	onBlur,
	onChange,
	placeholder,
	errors,
}: PasswordFieldProps) => {
	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = () => {
		setIsVisible((prev) => !prev);
	};

	return (
		<>
			<input
				type={isVisible ? 'text' : 'password'}
				id={name}
				name={name}
				value={value}
				onBlur={onBlur}
				onChange={onChange}
				placeholder={placeholder}
				className={errors ? styles.invalid : ''}
			/>
			<span onClick={toggleVisibility} className={styles.eye}>
				{isVisible ? (
					<FontAwesomeIcon icon={faEye} />
				) : (
					<FontAwesomeIcon icon={faEyeSlash} />
				)}
			</span>
		</>
	);
};

export default PasswordField;
