import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useProductTranslation } from '@/hooks/locales/pages/public';
import { useCartUpdates } from '@/hooks/contexts/useCartUpdates';

interface AddDetailsProps {
	id: string;
	show: boolean;
	setShow: Dispatch<SetStateAction<boolean>>;
	flashMessage: VoidFunction;
}

const AddToCartPopup = ({
	id,
	show,
	setShow,
	flashMessage,
}: AddDetailsProps) => {
	const tProduct = useProductTranslation();
	const navigate = useNavigate();

	const { addItem } = useCartUpdates();
	const toggleForDelivery = () => {
		setShow((prev) => !prev);
	};

	const addToCart = (forDelivery: boolean) => {
		setShow(false);
		flashMessage();

		if (!forDelivery)
			addItem({
				productId: id,
				forDelivery: false,
			});
		else navigate({ to: '/editor/$id', params: { id: id } });
	};

	return (
		<>
			{show && (
				<div className='fixed w-full h-full backdrop-blur-[5px] z-[40] left-0 top-0 bg-black/50'></div>
			)}
			<div
				className={`fixed text-white bg-black shadow-[0_4px_8px_rgba(0,0,0,0.2),0_0_20px_rgba(246,7,246,0.629)] rounded-lg p-10 z-50 text-center w-1/2 h-2/5 flex flex-col gap-5 justify-center items-center border-2 border-purple-800/20 transition-all duration-400 ease-in-out ${
					show
						? 'opacity-100 visible top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-3/5 scale-100'
						: 'opacity-0 invisible top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-3/5 scale-100'
				}`}
				style={{
					transitionProperty: 'opacity, transform, visibility',
				}}
			>
				<div
					className='absolute right-5 top-5 text-2xl cursor-pointer transition-colors duration-300 hover:text-pink-300/50'
					onClick={toggleForDelivery}
				>
					<FontAwesomeIcon icon={faTimes} />
				</div>
				<h1
					className='text-2xl capitalize font-bold'
					style={{
						textShadow:
							'3px 3px 5px rgba(75, 0, 130, 0.5), -3px -3px 5px rgba(138, 43, 226, 0.4), 0px 0px 8px rgba(138, 43, 226, 0.8), 0px 0px 20px rgba(138, 43, 226, 0.6)',
					}}
				>
					{tProduct('add-details-title')}
				</h1>
				<div className='flex gap-12 mt-2'>
					<button
						onClick={() => addToCart(true)}
						className="relative h-[50px] select-none whitespace-nowrap transition-all duration-[0.05s] ease-linear text-white tracking-[1px] px-[30px] py-0 border-2 border-solid border-white bg-black before:content-[''] before:absolute before:w-[calc(100%+6px)] before:h-[calc(100%-16px)] before:left-[-3px] before:top-2 before:bg-black before:transition-all before:duration-[0.2s] before:ease-linear after:content-[''] after:absolute after:w-[calc(100%-16px)] after:h-[calc(100%+6px)] after:top-[-3px] after:left-2 after:bg-black after:transition-all after:duration-[0.2s] after:ease-linear hover:cursor-pointer hover:border-[rgb(174,0,255)] active:scale-95 hover:before:h-[calc(100%-32px)] hover:before:top-4 hover:after:w-[calc(100%-32px)] hover:after:left-4"
					>
						<span className='text-[15px] z-[3] relative font-semibold'>
							{tProduct('add-details-yes')}
						</span>
					</button>
					<button
						onClick={() => addToCart(false)}
						className="relative h-[50px] select-none whitespace-nowrap transition-all duration-[0.05s] ease-linear text-white tracking-[1px] px-[30px] py-0 border-2 border-solid border-white bg-black before:content-[''] before:absolute before:w-[calc(100%+6px)] before:h-[calc(100%-16px)] before:left-[-3px] before:top-2 before:bg-black before:transition-all before:duration-[0.2s] before:ease-linear after:content-[''] after:absolute after:w-[calc(100%-16px)] after:h-[calc(100%+6px)] after:top-[-3px] after:left-2 after:bg-black after:transition-all after:duration-[0.2s] after:ease-linear hover:cursor-pointer hover:border-[rgb(174,0,255)] active:scale-95 hover:before:h-[calc(100%-32px)] hover:before:top-4 hover:after:w-[calc(100%-32px)] hover:after:left-4"
					>
						<span className='text-[15px] z-[3] relative font-semibold'>
							{tProduct('add-details-no')}
						</span>
					</button>
				</div>
			</div>
		</>
	);
};

export default AddToCartPopup;
