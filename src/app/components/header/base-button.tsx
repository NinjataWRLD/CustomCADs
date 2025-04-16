import { ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.css';

interface BaseButtonProps {
	children?: ReactNode;
	label: string;
	link: string;
	icon: IconDefinition;
	replace?: boolean;
}

const BaseButton = ({
	children,
	label,
	link,
	icon,
	replace = false,
}: BaseButtonProps) => {
	return (
		<div className={styles['icon-wrapper']} data-tooltip={label}>
			<Link to={link} replace={replace}>
				<FontAwesomeIcon
					icon={icon}
					size='2x'
					style={{ cursor: 'pointer' }}
					className={styles.icon}
				/>
				{children}
			</Link>
		</div>
	);
};

export default BaseButton;
