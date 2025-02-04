import React from 'react';
import Button from '@/app/components/button/button';
import styles from './info.module.css';
import { useHomeTranslation } from '@/hooks/locales/pages/public';

interface InfoProps {
	scrollTargetId?: string;
}

const Info: React.FC<InfoProps> = ({ scrollTargetId }) => {
	const tHome = useHomeTranslation();

	return (
		<div className={`${styles['main-info']}`}>
			<h1>{tHome('title_info')}</h1>
			<h2 className={`${styles.quote}`}>{tHome('subtitle_info')}</h2>
			<p>{tHome('info-1')}</p>
			<p>{tHome('info-2')}</p>
			<div className={`${styles.buttons}`}>
				<Button
					link='/register'
					text={tHome('btn-1')}
					className={`${styles.btn}`}
				/>
				<h2 className={`${styles.or}`}>{tHome('or')}</h2>
				<Button
					scroll={true}
					scrollTargetId={scrollTargetId}
					link='/'
					text={tHome('btn-2')}
					className={`${styles.btn}`}
				/>
			</div>
		</div>
	);
};

export default Info;
