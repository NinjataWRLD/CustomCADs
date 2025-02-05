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
import { useHeaderTranslation } from '@/hooks/locales/components/layout';

const ContentEnd = () => {
	const tHeader = useHeaderTranslation();

	return (
		<div className={styles['content-end']}>
			<div
				className={styles['icon-wrapper']}
				data-tooltip={tHeader('icon-1')}
			>
				<Link to='/gallery'>
					<FontAwesomeIcon
						icon={faImage}
						size='2x'
						style={{ cursor: 'pointer' }}
					/>
				</Link>
			</div>
			<span>|</span>
			<div
				className={styles['icon-wrapper']}
				data-tooltip={tHeader('icon-2')}
			>
				<Link to='/cart'>
					<FontAwesomeIcon
						icon={faShoppingCart}
						size='2x'
						style={{ cursor: 'pointer' }}
					/>
				</Link>
			</div>
			<span>|</span>
			<div
				className={styles['icon-wrapper']}
				data-tooltip={tHeader('icon-3')}
			>
				<Link to='/login'>
					<FontAwesomeIcon
						icon={faSignInAlt}
						size='2x'
						style={{ cursor: 'pointer' }}
					/>
				</Link>
			</div>
			<span>|</span>
			<div
				className={styles['icon-wrapper']}
				data-tooltip={tHeader('icon-4')}
			>
				<Link to='/register'>
					<FontAwesomeIcon
						icon={faUserPlus}
						style={{ fontSize: '1.8rem', cursor: 'pointer' }}
					/>
				</Link>
			</div>
			<span>|</span>
			<div
				className={styles['icon-wrapper']}
				data-tooltip={tHeader('icon-5')}
			>
				<LanguageButton />
			</div>
		</div>
	);
};

export default ContentEnd;
