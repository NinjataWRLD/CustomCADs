import { useState, useEffect, useRef } from 'react';
import { useNavigate } from '@tanstack/react-router';
import {
	faCog,
	faPuzzlePiece,
	faShoppingBag,
	faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import * as editorStore from '@/stores/editor-store';
import * as languageStore from '@/stores/language-store';
import * as currencyStore from '@/stores/currency-store';
import { useHeaderTranslation } from '@/hooks/locales/components/layout';
import { useAuthStore } from '@/hooks/stores/useAuthStore';
import { useCartContext } from '@/hooks/contexts/useCartContext';
import { useLogout } from '@/hooks/mutations/identity';
import * as authStore from '@/stores/auth-store';
import AccountButton from './account-button';
import Setting from './setting';

const SettingsButton = () => {
	const { dispatch } = useCartContext();
	const { mutateAsync: apiLogout } = useLogout();

	const navigate = useNavigate();
	const { is } = useAuthStore();
	const tHeader = useHeaderTranslation();

	const logout = async () => {
		await apiLogout();
		dispatch({ type: 'CLEAR_CART' });
		authStore.logout();
		editorStore.resetStore(null);
		languageStore.resetStore();
		currencyStore.resetStore();
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
			redirect={() =>
				navigate({ to: '/account', search: { tab: 'about-me' } })
			}
			icon={faCog}
			hide={hide}
		/>,
		<Setting
			key='logout'
			label={tHeader('logout')}
			redirect={() => navigate({ to: '/' })}
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
				redirect={() => navigate({ to: '/carts' })}
				icon={faShoppingBag}
				hide={hide}
			/>,
			<Setting
				key='orders'
				label={tHeader('orders')}
				redirect={() => navigate({ to: '/services-info' })}
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
