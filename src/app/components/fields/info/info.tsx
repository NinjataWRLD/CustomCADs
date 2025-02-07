import { FieldMeta } from '@tanstack/react-form';
import styles from './info.module.css';

interface FieldInfoProps {
	meta: FieldMeta;
}

const FieldInfo = ({ meta }: FieldInfoProps) => {
	const { isTouched, isValidating, errors } = meta;

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
