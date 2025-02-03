import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faImage,
	faShoppingCart,
	faSignInAlt,
	faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import LanguageButton from './language-btn';
import styles from '../header.module.css';

const ContentEnd: React.FC = () => {
	return (
		<div className={styles['content-end']}>
			<div className={styles['icon-wrapper']} data-tooltip='Gallery'>
				<Link to='/gallery'>
					<FontAwesomeIcon
						icon={faImage}
						size='2x'
						style={{ cursor: 'pointer' }}
					/>
				</Link>
			</div>
			<span>|</span>
			<div className={styles['icon-wrapper']} data-tooltip='Cart'>
				<Link to='/cart'>
					<FontAwesomeIcon
						icon={faShoppingCart}
						size='2x'
						style={{ cursor: 'pointer' }}
					/>
				</Link>
			</div>
			<span>|</span>
			<div className={styles['icon-wrapper']} data-tooltip='Log In'>
				<Link to='/login'>
					<FontAwesomeIcon
						icon={faSignInAlt}
						size='2x'
						style={{ cursor: 'pointer' }}
					/>
				</Link>
			</div>
			<span>|</span>
			<div className={styles['icon-wrapper']} data-tooltip='Register'>
				<Link to='/register'>
					<FontAwesomeIcon
						icon={faUserPlus}
						style={{ fontSize: '1.8rem', cursor: 'pointer' }}
					/>
				</Link>
			</div>
			<span>|</span>
			<div className={styles['icon-wrapper']} data-tooltip='Language'>
				<LanguageButton />
			</div>
		</div>
	);
};

export default ContentEnd;
