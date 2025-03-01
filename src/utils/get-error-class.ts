import { ValidationError } from '@tanstack/react-form';
import styles from '@/styles/forms.module.css';

const getErrorClass = (errors: ValidationError[]) =>
	errors ? styles.invalid : '';

export default getErrorClass;
