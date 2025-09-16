import { Link } from '@tanstack/react-router';
import {
	faImage,
	faShoppingCart,
	faSignInAlt,
	faTools,
	faShoppingBag,
	faTruck,
} from '@fortawesome/free-solid-svg-icons';
import { useAuthStore } from '@/hooks/stores/useAuthStore';
import { useCartContext } from '@/hooks/contexts/useCartContext';
import { useHeaderTranslation } from '@/hooks/locales/components/layout';
import BaseButton from './base-button';
import SettingsButton from './settings';
import Language from './language';
import NotificationsButton from './notifications';

const title = 'CustomCADs';
const Header = () => {
	const { is } = useAuthStore();
	const { items } = useCartContext();

	const tHeader = useHeaderTranslation();

	return (
		<header className='fixed w-full h-[50px] flex justify-between bg-[linear-gradient(135deg,_rgba(57,44,83,0.486),_rgba(0,0,0,0.358))] text-white z-10'>
			<div className='flex items-center ml-8'>
				<div className='flex items-center gap-8 mr-8'>
					<BaseButton
						label={tHeader('gallery')}
						link={{ to: '/gallery' }}
						icon={faImage}
						replace
					/>
					{/* TODO: uncomment when we have an about-us page */}
					{/* <span>|</span>
					<BaseButton
						label={tHeader('about-us')}
						link={{ to: '/about-us' }}
						icon={faUsers}
					/> */}
					{(is.guest || is.customer) && items && (
						<>
							<span>|</span>
							<BaseButton
								label={tHeader('cart')}
								link={{ to: '/cart' }}
								icon={faShoppingCart}
							>
								<div className='absolute bottom-1 right-0 w-5 h-5 bg-purple-700 text-white rounded-full flex justify-center items-center text-xs font-bold border-2 border-white transform translate-x-1/2 translate-y-1/2'>
									{items.length}
								</div>
							</BaseButton>
						</>
					)}
					{is.customer && (
						<>
							{/* TODO: ucnomment when we have a customs page */}
							{/* <span>|</span>
							<BaseButton
							key='cusotms'
							label={tHeader('customs')}
							link={{ to: '/customs' }}
							icon={faPuzzlePiece}
							/> */}
							<span>|</span>
							<BaseButton
								key='carts'
								label={tHeader('carts')}
								link={{ to: '/carts' }}
								icon={faShoppingBag}
							/>
							<span>|</span>
							<BaseButton
								key='shipments'
								label={tHeader('shipments')}
								link={{ to: '/shipments' }}
								icon={faTruck}
							/>
						</>
					)}
				</div>
			</div>
			<div className='absolute flex items-center left-[45%] top-[-15%]'>
				<Link to='/' className='text-white'>
					<h2>{title}</h2>
				</Link>
			</div>
			<div className='flex items-center gap-8 mr-8'>
				{!is.guest ? (
					<>
						<NotificationsButton />
						<span>|</span>
						<SettingsButton />
					</>
				) : (
					<>
						<BaseButton
							label={tHeader('login')}
							link={{ to: '/login' }}
							icon={faSignInAlt}
						/>
						<span>|</span>
						<BaseButton
							label={tHeader('services')}
							link={{ to: '/services-info' }}
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
