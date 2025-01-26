import Link from 'next/link';
import styles from '../header.module.css';

const ContentStart = () => {
	const toggleNavVisibility = () => {
		const menuElement = document.querySelector(`.${styles.menu}`);
		if (menuElement) {
			menuElement.classList.toggle(styles.active);
		}
	};

	return (
		<div className={styles['content-start']}>
			<div onClick={toggleNavVisibility} className={styles.menu}>
				<h2>CustomCADs</h2>
				<span className={styles['left-icon']}></span>
				<span className={styles['right-icon']}></span>
			</div>
			<div className={styles.nav}>
				<Link
					href='/'
					onClick={toggleNavVisibility}
					style={{ '--i': 1 } as React.CSSProperties}
				>
					<span></span>Home
				</Link>
				<Link
					href='/gallery'
					onClick={toggleNavVisibility}
					style={{ '--i': 2 } as React.CSSProperties}
				>
					<span></span>Gallery
				</Link>
				<Link
					href='/roles'
					onClick={toggleNavVisibility}
					style={{ '--i': 3 } as React.CSSProperties}
				>
					<span></span>Roles
				</Link>
				<Link
					href='/about'
					onClick={toggleNavVisibility}
					style={{ '--i': 4 } as React.CSSProperties}
				>
					<span></span>About us
				</Link>
			</div>
		</div>
	);
};

export default ContentStart;
