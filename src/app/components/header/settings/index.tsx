import { useState } from 'react';
import {
	faCog,
	faPuzzlePiece,
	faShoppingBag,
	faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { useHeaderTranslation } from '@/hooks/locales/components/layout';
import { useAuthStore } from '@/hooks/stores/useAuthStore';
import { useCartContext } from '@/hooks/contexts/useCartContext';
import { useLogout } from '@/hooks/mutations/identity';
import * as authStore from '@/stores/auth-store';
import AccountButton from './account-button';
import Setting from './setting';
import styles from './styles.module.css';

const SettingsButton = () => {
	const { is } = useAuthStore();

	const tHeader = useHeaderTranslation();
	const { dispatch } = useCartContext();

	const { mutateAsync: apiLogout } = useLogout();
	const logout = async () => {
		await apiLogout();
		dispatch({ type: 'CLEAR_CART' });
		authStore.logout();
	};

	const [show, setShow] = useState(false);
	const toggle = () => setShow((prev) => !prev);
	const hide = () => setShow(false);

	const settings = [
		<Setting
			label={tHeader('account')}
			link='/account'
			icon={faCog}
			hide={hide}
		/>,
		<Setting
			label={tHeader('logout')}
			link='/'
			icon={faSignOutAlt}
			hide={hide}
			onClick={logout}
		/>,
	];
	if (is.client)
		settings.unshift(
			<Setting
				label={tHeader('carts')}
				link='/carts'
				icon={faShoppingBag}
				hide={hide}
			/>,
			<Setting
				label={tHeader('orders')}
				link='/orders'
				icon={faPuzzlePiece}
				hide={hide}
			/>,
		);

	return (
		<>
			<AccountButton label={tHeader('settings')} toggle={toggle} />
			{show && (
				<div className={styles['account-wrapper']}>
					<ul className={styles['account']}>{settings}</ul>
				</div>
			)}
		</>
	);
};

export default SettingsButton;
