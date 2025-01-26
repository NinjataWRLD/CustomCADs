import React from 'react';
import styles from '../header.module.css';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faImage,
	faSignInAlt,
	faUserPlus,
} from '@fortawesome/free-solid-svg-icons';

const ContentEnd: React.FC = () => {
	return (
		<div className={styles['content-end']}>
			<div className={styles['icon-wrapper']} data-tooltip='Gallery'>
				<Link href='/gallery'>
					<FontAwesomeIcon
						icon={faImage}
						size='2x'
						style={{ cursor: 'pointer' }}
					/>
				</Link>
			</div>
			<span>|</span>
			<div className={styles['icon-wrapper']} data-tooltip='Log In'>
				<Link href='/login'>
					<FontAwesomeIcon
						icon={faSignInAlt}
						size='2x'
						style={{ cursor: 'pointer' }}
					/>
				</Link>
			</div>
			<span>|</span>
			<div className={styles['icon-wrapper']} data-tooltip='Register'>
				<Link href='/register'>
					<FontAwesomeIcon
						icon={faUserPlus}
						style={{ fontSize: '1.8rem', cursor: 'pointer' }}
					/>
				</Link>
			</div>
		</div>
	);
};

export default ContentEnd;
