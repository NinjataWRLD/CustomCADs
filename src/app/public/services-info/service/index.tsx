import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useServicesTranslation } from '@/hooks/locales/pages/public';
import Button from '@/app/components/button';
import styles from './styles.module.css';

interface ServiceProps {
	title: string;
	details: string;
	role: string;
	icon: IconDefinition;
	button: string;
}

const Service = ({ title, details, role, icon, button }: ServiceProps) => {
	const tServices = useServicesTranslation();

	return (
		<div className={`${styles.service}`}>
			<div className={`${styles.circle}`}>
				<FontAwesomeIcon className={styles.icon} icon={icon} />
			</div>

			<div className={`${styles.text}`}>
				<div className={`${styles.title}`}>{title}</div>
				<div className={`${styles.details}`}>{details}</div>
				<div className={`${styles.role}`}>
					{tServices('helperText')} <span>{role}</span>
				</div>
			</div>
			<div className={`${styles.btn}`}>
				<Button type='button' text={button} />
			</div>
		</div>
	);
};

export default Service;
