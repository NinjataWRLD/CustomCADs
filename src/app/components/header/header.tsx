import { Link } from 'react-router-dom';
import {
	faImage,
	faShoppingCart,
	faSignInAlt,
	faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import useAuthStore from '@/hooks/stores/useAuthStore';
import { useHeaderTranslation } from '@/hooks/locales/components/layout';
import LanguageButton from './components/language/language-btn';
import SettingsButton from './components/settings/settings-btn';
import styles from './header.module.css';
import BaseButton from './components/base/base-btn';

const title = 'CustomCADs';
const Header = () => {
	const { authn, authz } = useAuthStore();
	const tHeader = useHeaderTranslation();

	return (
		<header className={styles.header}>
			<div className={styles['content-start']}>
				<Link to='/' style={{ color: 'white' }}>
					<h2>{title}</h2>
				</Link>
			</div>
			<div className={styles['content-end']}>
				<BaseButton
					label={tHeader('icon-1')}
					link='/gallery'
					icon={faImage}
				/>
				<span>|</span>
				<BaseButton
					label={tHeader('icon-2')}
					link='/cart'
					icon={faShoppingCart}
				/>
				<span>|</span>
				{authn && authz ? (
					<SettingsButton role={authz} />
				) : (
					<>
						<BaseButton
							label={tHeader('icon-3')}
							link='/login'
							icon={faSignInAlt}
						/>
						<span>|</span>
						<BaseButton
							label={tHeader('icon-4')}
							link='/register'
							icon={faUserPlus}
						/>
					</>
				)}
				<span>|</span>
				<div
					className={styles['icon-wrapper']}
					data-tooltip={tHeader('icon-5')}
				>
					<LanguageButton />
				</div>
			</div>
		</header>
	);
};

export default Header;
