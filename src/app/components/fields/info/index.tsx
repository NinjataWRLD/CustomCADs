import styles from './styles.module.css';

interface FieldInfoProps {
	info: {
		isTouched: boolean;
		isValidating: boolean;
		errors: string[];
	};
}

const FieldInfo = ({ info }: FieldInfoProps) => {
	const { isTouched, isValidating, errors } = info;

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
