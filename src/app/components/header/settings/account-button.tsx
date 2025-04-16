import { ReactNode } from '@tanstack/react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCog } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles.module.css';
import accountStyles from './styles.module.css'

interface BaseButtonProps {
	label: string;
	settings: ReactNode;
	show: boolean;
	toggle: VoidFunction;
}

const AccountButton = ({ label, settings, show, toggle }: BaseButtonProps) => {
	return (
		<div className={styles['icon-wrapper']} data-tooltip={label}>
			<FontAwesomeIcon
				icon={faUserCog}
				size='2x'
				style={{ cursor: 'pointer' }}
				onClick={toggle}
			/>
			{show && (
				<div className={accountStyles['account-wrapper']}>
					<ul className={accountStyles['account']}>{settings}</ul>
				</div>
			)}
		</div>
	);
};

export default AccountButton;
