import { Link } from 'react-router-dom';
import styles from '../header.module.css';
import { useHeaderTranslation } from '@/hooks/locales/components/layout';

const ContentStart = () => {
	const tHeader = useHeaderTranslation();

	const toggleNavVisibility = () => {
		const menuElement = document.querySelector(`.${styles.menu}`);
		if (menuElement) {
			menuElement.classList.toggle(styles.active);
		}
	};

	const title = 'CustomCADs';
	return (
		<div className={styles['content-start']}>
			<div onClick={toggleNavVisibility} className={styles.menu}>
				<h2>{title}</h2>
				<span className={styles['left-icon']}></span>
				<span className={styles['right-icon']}></span>
			</div>
			<div className={styles.nav}>
				<Link
					to='/'
					onClick={toggleNavVisibility}
					style={{ '--i': 1 } as React.CSSProperties}
				>
					<span></span>
					{tHeader('sidebar-link-1')}
				</Link>
				<Link
					to='/gallery'
					onClick={toggleNavVisibility}
					style={{ '--i': 2 } as React.CSSProperties}
				>
					<span></span>
					{tHeader('sidebar-link-2')}
				</Link>
			</div>
		</div>
	);
};

export default ContentStart;
