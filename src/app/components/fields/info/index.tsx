import styles from './styles.module.css';

interface FieldInfoProps {
	isTouched: boolean;
	isValidating: boolean;
	errors: string[];
}

const FieldInfo = ({ isTouched, isValidating, errors }: FieldInfoProps) => {
	return (
		<>
			{isTouched && errors.length ? (
				<small className={styles.error}>{errors[0]}</small>
			) : null}
			{isValidating ? 'Validating...' : null}
		</>
	);
};

export default FieldInfo;
