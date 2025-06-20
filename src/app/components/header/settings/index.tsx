import { useState, useEffect, useRef } from 'react';
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

	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				hide();
			}
		};

		if (show) {
			document.addEventListener('click', handleClickOutside, true);
		}

		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, [show]);

	const settings = [
		<Setting
			key='account'
			label={tHeader('account')}
			link='/account'
			icon={faCog}
			hide={hide}
		/>,
		<Setting
			key='logout'
			label={tHeader('logout')}
			link='/'
			icon={faSignOutAlt}
			hide={hide}
			onClick={logout}
		/>,
	];

	if (is.customer) {
		settings.unshift(
			<Setting
				key='carts'
				label={tHeader('carts')}
				link='/carts'
				icon={faShoppingBag}
				hide={hide}
			/>,
			<Setting
				key='orders'
				label={tHeader('orders')}
				link='/orders'
				icon={faPuzzlePiece}
				hide={hide}
			/>,
		);
	}

	return (
		<div ref={ref}>
			<AccountButton
				label={tHeader('settings')}
				settings={settings}
				show={show}
				toggle={toggle}
			/>
		</div>
	);
};

export default SettingsButton;
