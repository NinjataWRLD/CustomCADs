import { Link } from '@tanstack/react-router';
import {
	faImage,
	faShoppingCart,
	faSignInAlt,
	faTools,
} from '@fortawesome/free-solid-svg-icons';
import { useAuthStore } from '@/hooks/stores/useAuthStore';
import { useCartContext } from '@/hooks/contexts/useCartContext';
import { useHeaderTranslation } from '@/hooks/locales/components/layout';
import SettingsButton from './settings';
import BaseButton from './base-button';
import Language from './language';
import styles from './styles.module.css';

const title = 'CustomCADs';
const Header = () => {
	const { is } = useAuthStore();
	const { items } = useCartContext();

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
					replace
				/>
				<span>|</span>
				{(is.guest || is.customer) && items && (
					<>
						<BaseButton
							label={tHeader('icon-2')}
							link='/cart'
							icon={faShoppingCart}
						>
							<div className={styles.circle}>{items.length}</div>
						</BaseButton>
						<span>|</span>
					</>
				)}
				{!is.guest ? (
					<SettingsButton />
				) : (
					<>
						<BaseButton
							label={tHeader('icon-3')}
							link='/login'
							icon={faSignInAlt}
						/>
						<span>|</span>
						<BaseButton
							label={tHeader('icon-6')}
							link='/services-info'
							icon={faTools}
						/>
					</>
				)}
				<span>|</span>
				<Language />
			</div>
		</header>
	);
};

export default Header;
