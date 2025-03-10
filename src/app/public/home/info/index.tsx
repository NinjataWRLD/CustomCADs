import { useHomeTranslation } from '@/hooks/locales/pages/public';
import Btn from '@/app/components/button';
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
				<Btn
					type='link'
					text={tHome('btn-1')}
					link='/register/client'
				/>
				<h2 className={`${styles.or}`}>{tHome('or')}</h2>
				<Btn
					type='link'
					text={tHome('btn-2')}
					link='/register/contributor'
				/>
			</div>
		</div>
	);
};

export default Info;
