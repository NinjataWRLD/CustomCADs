import { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useUploadProductTranslation } from '@/hooks/locales/pages/creator';
import { useBlockScroll } from '@/hooks/useBlockScroll';
import Blur from '@/app/components/background/blur';

type PopupProps = {
	children: ReactNode;
	type: 'image' | 'cad';
	isActive: boolean;
	hide: VoidFunction;
};
const Popup = ({ children, type, isActive, hide }: PopupProps) => {
	const tUploadProduct = useUploadProductTranslation();
	useBlockScroll(isActive);

	return (
		<>
			{isActive && <Blur />}
			<div
				className={`fixed ${type === 'cad' ? 'w-2/5 h-3/4 pb-6' : 'max-w-96 max-h-96 p-10'} top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-[0_4px_8px_rgba(0,0,0,0.2),0_0_20px_rgba(246,7,246,0.629)] rounded-lg z-50 flex flex-col justify-center items-center border-2 border-purple-800/20 transition-all duration-400 ease-in-out gap-2 ${
					isActive ? 'opacity-100 visible' : 'opacity-0 invisible'
				}`}
				style={{
					transitionProperty: 'opacity, transform, visibility',
				}}
			>
				<div
					className='absolute right-3 top-2 text-2xl z-60 cursor-pointer transition-colors duration-300 hover:text-pink-300/50'
					onClick={hide}
				>
					<FontAwesomeIcon icon={faTimes} />
				</div>
				{children}
				<span className='max-w-6/7 text-center pt-3 pb-2 px-3 text-lg bg-slate-700 rounded-xl z-60 duration-300 border-gray-800 border-3'>
					{tUploadProduct('hint')}
				</span>
			</div>
		</>
	);
};

export default Popup;
