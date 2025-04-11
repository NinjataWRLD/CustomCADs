import { useRouter } from '@tanstack/react-router';
import styles from './styles.module.css';

const BackButton = ({ text }: { text?: string }) => {
	const {
		history: { back: goBack },
	} = useRouter();

	return (
		<a onClick={() => goBack()} className={styles.link}>
			<div className={`${styles.button}`}>{text}</div>
			<div className={`${styles['button-gradient']}`} />
		</a>
	);
};

export default BackButton;
