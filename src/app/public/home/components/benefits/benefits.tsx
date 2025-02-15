import { useNavigate } from 'react-router-dom';
import Sheet from './sheets/sheet';
import styles from './benefits.module.css';
import { useHomeTranslation } from '@/hooks/locales/pages/public';

const Benefits = () => {
	const tHome = useHomeTranslation();
	const navigate = useNavigate();

	return (
		<div className={`${styles.container}`}>
			<div
				onClick={() => navigate('/gallery')}
				className={`${styles.picture}`}
			></div>
			<div className={`${styles.content}`}>
				<h1>{tHome('title_benefits')}?</h1>
				<Sheet
					icon='fas fa-eye'
					title={tHome('benefits-subtitle-1')}
					details={tHome('benefits-text-1')}
				/>
				<Sheet
					icon='fas fa-robot'
					title={tHome('benefits-subtitle-2')}
					details={tHome('benefits-text-2')}
				/>
				<Sheet
					icon='fas fa-globe'
					title={tHome('benefits-subtitle-3')}
					details={tHome('benefits-text-3')}
				/>
			</div>
		</div>
	);
};

export default Benefits;
