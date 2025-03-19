import { useHomeTranslation } from '@/hooks/locales/pages/public';
import CustomLink from '@/app/components/link';
import styles from './styles.module.css';

const Info = () => {
	const tHome = useHomeTranslation();

	return (
		<div className={`${styles['main-info']}`}>
			<h1>{tHome('title_info')}</h1>
			<h2 className={`${styles.quote}`}>{tHome('subtitle_info')}</h2>
			<p>{tHome('info-1')}</p>
			<p>{tHome('info-2')}</p>
			<div className={`${styles.buttons}`}>
				<CustomLink
					to='/register/$role'
					params={{ role: 'client' }}
					text={tHome('btn-1')}
				/>
				<h2 className={`${styles.or}`}>{tHome('or')}</h2>
				<CustomLink
					to='/register/$role'
					params={{ role: 'contributor' }}
					text={tHome('btn-2')}
				/>
			</div>
		</div>
	);
};

export default Info;
