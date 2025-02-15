import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.css';

interface SettingProps {
	icon: IconDefinition;
	label: string;
	link: string;
	hide: VoidFunction;
	onClick?: VoidFunction;
}

const Setting = ({ label, link, icon, hide, onClick }: SettingProps) => {
	const navigate = useNavigate();

	return (
		<div className={styles.item}>
			<li
				className={styles['account-item']}
				onClick={() => {
					hide();
					navigate(link);
					if (onClick) onClick();
				}}
			>
				<FontAwesomeIcon icon={icon} />
			</li>
			<span>{label}</span>
		</div>
	);
};

export default Setting;
