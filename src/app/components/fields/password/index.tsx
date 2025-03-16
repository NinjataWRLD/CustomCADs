import { useState } from 'react';
import { AnyFieldApi } from '@tanstack/react-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Field, { getErrorClass } from '..';
import styles from '../styles.module.css';

interface PasswordFieldProps {
	api: AnyFieldApi;
	label: string;
	placeholder: string;
}

const PasswordField = ({ api, label, placeholder }: PasswordFieldProps) => {
	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = () => {
		setIsVisible((prev) => !prev);
	};

	const { isBlurred, isTouched, errors } = api.state.meta;
	const showError = isBlurred && isTouched;
	const hasError = !!errors.length;

	return (
		<Field
			tag='custom'
			api={api}
			label={label}
			field={
				<div className={styles['password-wrapper']}>
					<input
						type={isVisible ? 'text' : 'password'}
						id={api.name}
						name={api.name}
						value={api.state.value}
						onBlur={api.handleBlur}
						onChange={(e) => api.handleChange(e.target.value)}
						placeholder={placeholder}
						className={getErrorClass(showError && hasError)}
					/>
					<span onClick={toggleVisibility} className={styles.eye}>
						{isVisible ? (
							<FontAwesomeIcon icon={faEye} />
						) : (
							<FontAwesomeIcon icon={faEyeSlash} />
						)}
					</span>
				</div>
			}
		/>
	);
};

export default PasswordField;
