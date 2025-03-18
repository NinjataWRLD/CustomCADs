import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCog } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles.module.css';

interface BaseButtonProps {
	label: string;
	toggle: VoidFunction;
}

const AccountButton = ({ label, toggle }: BaseButtonProps) => {
	return (
		<div className={styles['icon-wrapper']} data-tooltip={label}>
			<FontAwesomeIcon
				icon={faUserCog}
				size='2x'
				style={{ cursor: 'pointer' }}
				onClick={toggle}
			/>
		</div>
	);
};

export default AccountButton;
