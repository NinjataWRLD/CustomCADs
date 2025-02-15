import { useState } from 'react';
import {
	faCog,
	faPuzzlePiece,
	faShoppingBag,
	faSignOutAlt,
	faUserCog,
} from '@fortawesome/free-solid-svg-icons';
import { useHeaderTranslation } from '@/hooks/locales/components/layout';
import useCartInit from '@/hooks/contexts/useCartInit';
import useLogout from '@/hooks/mutations/sign-in/useLogout';
import * as authStore from '@/stores/auth-store';
import BaseButton from '../base';
import Setting from './setting';
import styles from './styles.module.css';

const SettingsButton = ({ role }: { role: string }) => {
	const tHeader = useHeaderTranslation();
	const { dispatch } = useCartInit();

	const mutation = useLogout();
	const logout = async () => {
		dispatch({ type: 'CLEAR_CART' });
		await mutation.mutateAsync();
		authStore.logout();
	};

	const [show, setShow] = useState(false);
	const toggle = () => setShow((prev) => !prev);
	const hide = () => setShow(false);

	let settings;
	switch (role) {
		case 'Client':
			settings = (
				<>
					<Setting
						label={'Carts'}
						link='/carts'
						icon={faShoppingBag}
						hide={hide}
					/>
					<Setting
						label={'Orders'}
						link='/orders'
						icon={faPuzzlePiece}
						hide={hide}
					/>
				</>
			);
			break;
		case 'Contributor':
			break;
		case 'Designer':
			break;
		default:
			break;
	}

	return (
		<>
			<BaseButton
				icon={faUserCog}
				label={tHeader('Settings')}
				onClick={toggle}
			/>
			{show && (
				<div className={styles['account-wrapper']}>
					<ul className={styles['account']}>
						{settings}
						<Setting
							label={'Account'}
							link='/account'
							icon={faCog}
							hide={hide}
						/>
						<Setting
							label={'Log Out'}
							link='/'
							icon={faSignOutAlt}
							hide={hide}
							onClick={logout}
						/>
					</ul>
				</div>
			)}
		</>
	);
};

export default SettingsButton;
