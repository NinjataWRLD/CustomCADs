import { ReactNode } from '@tanstack/react-router';
import { useServicesTranslation } from '@/hooks/locales/pages/public';
import styles from './styles.module.css';

interface ServiceProps {
	title: string;
	details: string;
	role: string;
	icon: ReactNode;
	button: ReactNode;
}

const Service = ({ title, details, role, icon, button }: ServiceProps) => {
	const tServices = useServicesTranslation();

	return (
		<div className={`${styles.service}`}>
			<div className={`${styles.circle}`}>{icon}</div>

			<div className={`${styles.text}`}>
				<div className={`${styles.title}`}>{title}</div>
				<div className={`${styles.details}`}>{details}</div>
				<div className={`${styles.role}`}>
					{tServices('helperText')} <span>{role}</span>
				</div>
			</div>
			<div className={`${styles.btn}`}>{button}</div>
		</div>
	);
};

export default Service;
