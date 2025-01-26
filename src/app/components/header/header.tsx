import React from 'react';
import styles from './header.module.css';
import ContentStart from './contents/start';
import ContentEnd from './contents/end';

const Header: React.FC = () => {
	return (
		<>
			<header className={styles.header}>
				<ContentStart />
				<ContentEnd />
			</header>
		</>
	);
};

export default Header;
