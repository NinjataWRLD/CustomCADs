import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import styles from './base.module.css';

interface BaseButtonProps {
	label: string;
	link: string;
	icon: IconDefinition;
	onClick?: VoidFunction;
}

const BaseButton = ({ label, link, icon, onClick }: BaseButtonProps) => {
	return (
		<div className={styles['icon-wrapper']} data-tooltip={label}>
			<Link to={link}>
				<FontAwesomeIcon
					icon={icon}
					size='2x'
					style={{ cursor: 'pointer' }}
					onClick={onClick}
				/>
			</Link>
		</div>
	);
};

export default BaseButton;
