import { Link } from '@tanstack/react-router';
import {
	faImage,
	faShoppingCart,
	faSignInAlt,
	faTools,
	faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { useAuthStore } from '@/hooks/stores/useAuthStore';
import { useCartContext } from '@/hooks/contexts/useCartContext';
import { useHeaderTranslation } from '@/hooks/locales/components/layout';
import SettingsButton from './settings';
import BaseButton from './base-button';
import Language from './language';

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
						label={tHeader('icon-1')}
						link='/gallery'
						icon={faImage}
						replace
					/>
					{is.guest && (
						<>
							<span>|</span>
							<BaseButton
								label={tHeader('icon-7')}
								link='/about-us'
								icon={faUsers}
							/>
						</>
					)}
					{(is.guest || is.customer) && items && (
						<>
							<span>|</span>
							<BaseButton
								label={tHeader('icon-2')}
								link='/cart'
								icon={faShoppingCart}
							>
								<div className='absolute bottom-1 right-0 w-5 h-5 bg-purple-700 text-white rounded-full flex justify-center items-center text-xs font-bold border-2 border-white transform translate-x-1/2 translate-y-1/2'>
									{items.length}
								</div>
							</BaseButton>
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
