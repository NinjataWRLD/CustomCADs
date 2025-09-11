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
import { usePopup } from '@/hooks/usePopup';
import * as authStore from '@/stores/auth-store';
import AccountButton from './account-button';
import Setting from './setting';

const SettingsButton = () => {
	const { dispatch } = useCartContext();
	const { mutateAsync: apiLogout } = useLogout();

	const popup = usePopup();
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

	const settings = [
		<Setting
			key='account'
			label={tHeader('account')}
			redirect={() =>
				navigate({ to: '/account', search: { tab: 'about-me' } })
			}
			icon={faCog}
			hide={popup.close}
		/>,
		<Setting
			key='logout'
			label={tHeader('logout')}
			redirect={() => navigate({ to: '/' })}
			icon={faSignOutAlt}
			hide={popup.close}
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
				hide={popup.close}
			/>,
			<Setting
				key='orders'
				label={tHeader('orders')}
				redirect={() => navigate({ to: '/services-info' })}
				icon={faPuzzlePiece}
				hide={popup.close}
			/>,
		);
	}

	return (
		<div ref={popup.ref}>
			<AccountButton
				label={tHeader('settings')}
				settings={settings}
				show={popup.isOpen}
				toggle={popup.toggle}
			/>
		</div>
	);
};

export default SettingsButton;
