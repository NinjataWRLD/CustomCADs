import { useState, useEffect } from 'react';
import { useCanGoBack } from '@tanstack/react-router';
import { Route } from '@/routes/_public/gallery/$id';
import { useAuthStore } from '@/hooks/stores/useAuthStore';
import { useCartUpdates } from '@/hooks/contexts/useCartUpdates';
import { useProductTranslation } from '@/hooks/locales/pages/public';
import { useCartContext } from '@/hooks/contexts/useCartContext';
import { useMoney } from '@/hooks/money/useMoney';
import Transition from '@/app/components/transition';
import Button from '@/app/components/button';
import CustomLink from '@/app/components/link';
import BackButton from '@/app/components/link/back-button';
import Cad from '@/app/components/cad';
import * as dateTime from '@/utils/date-time';
import AddToCartPopup from './add-to-cart-popup';

const Product = () => {
	const canGoBack = useCanGoBack();
	const { is } = useAuthStore();

	const { product } = Route.useLoaderData();
	const isPrintable = product.tags.includes('Printable');

	const tProduct = useProductTranslation();
	const { items } = useCartContext();

	const alreadyInCart = items?.some((i) => i.productId === product.id);
	const { addItem } = useCartUpdates();

	const price = useMoney(product.price);
	const [showPopupMessage, setShowPopupMessage] = useState(false);

	useEffect(() => {
		const style = document.createElement('style');
		style.innerHTML = `
      @keyframes fadeInOut {
        0% { opacity: 0; transform: translateY(-20px); }
        10% { opacity: 1; transform: translateY(0); }
        90% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(-20px); }
      }
      .fadeInOutAnimation {
        animation: fadeInOut 3s ease-in-out forwards;
      }
    `;
		document.head.appendChild(style);

		return () => {
			document.head.removeChild(style);
		};
	}, []);

	const flashPopupMessage = () => {
		setShowPopupMessage(true);

		setTimeout(() => {
			setShowPopupMessage(false);
		}, 3000);
	};

	const [showPopup, setShowPopup] = useState(false);
	const toggleForDelivery = async () => {
		if (isPrintable) {
			setShowPopup((prev) => !prev);
		} else {
			await addItem({
				productId: product.id,
				forDelivery: false,
			});
			flashPopupMessage();
		}
	};

	return (
		<>
			<Transition>
				<div className='relative h-screen w-full flex justify-center items-center bg-transparent text-white'>
					<div
						className='relative w-full h-full rounded-lg flex p-0 px-5 bg-black'
						style={{
							backgroundImage: `
                   linear-gradient(0deg, transparent 24%, hsla(302, 75%, 36%, 0.292) 25%, hsla(302, 75%, 36%, 0.292) 26%, transparent 27%, transparent 74%, hsla(302, 75%, 36%, 0.292) 75%, hsla(302, 75%, 36%, 0.292) 76%, transparent 77%, transparent),
                   linear-gradient(90deg, transparent 24%, hsla(302, 75%, 36%, 0.292) 25%, hsla(302, 75%, 36%, 0.292) 26%, transparent 27%, transparent 74%, hsla(302, 75%, 36%, 0.292) 75%, hsla(302, 75%, 36%, 0.292) 76%, transparent 77%, transparent)
                 `,
							backgroundSize: '55px 55px',
						}}
					>
						<div className='w-1/2 flex items-center justify-center bg-transparent'>
							<div className='w-4/5 h-4/5 flex justify-center items-center rounded-lg transition-all duration-[800ms] ease-out border-4 border-[#313131] shadow-lg bg-[hsl(228,21%,14%)] hover:shadow-[0_0_30px_rgb(96,22,118)] hover:border-[#721f83]'>
								<Cad type='gallery' product={product} />
							</div>
						</div>

						<div className='relative flex flex-col justify-center items-center w-1/2 h-full gap-5'>
							<div className='w-[90%] h-3/5 flex flex-col justify-center items-center text-center overflow-hidden rounded-lg bg-gray-800 border-4 border-[#313131] shadow-lg transition-all duration-800 ease-out hover:shadow-[0_0_30px_rgb(96,22,118)] hover:border-[#721f83]'>
								<h1 className='text-5xl capitalize title-text-shadow'>
									{product.name}
								</h1>
								<p className='text-base leading-normal text-white/70 mb-3 transition-colors duration-400 hover:text-white'>
									<strong className='font-semibold mr-2.5 text-white/55 uppercase product-text-shadow'>
										{tProduct('category')}
									</strong>
									{product.category.name}
								</p>
								<p className='text-base leading-normal text-white/70 mb-3 transition-colors duration-400 hover:text-white'>
									<strong className='font-semibold mr-2.5 text-white/55 uppercase product-text-shadow'>
										{tProduct('creator')}
									</strong>
									{product.creatorName}
								</p>
								<hr className='my-2.5 w-full' />
								<p className='text-base leading-normal text-white/70 mb-3 transition-colors duration-400 hover:text-white'>
									{product.description}
								</p>
								<hr className='my-2.5 w-full' />
								<p className='text-base leading-normal text-white/70 mb-3 transition-colors duration-400 hover:text-white'>
									<strong className='font-semibold mr-2.5 text-white/55 uppercase product-text-shadow'>
										{tProduct('price')}
									</strong>
									{price}
								</p>
								<p className='text-base leading-normal text-white/70 mb-3 transition-colors duration-400 hover:text-white'>
									<strong className='font-semibold mr-2.5 text-white/55 uppercase product-text-shadow'>
										{tProduct('uploaded-on')}
									</strong>
									{dateTime.format({
										date: product.uploadedAt,
									})}
								</p>
							</div>

							<div className='flex gap-12 mt-2.5'>
								{is.customer || is.guest ? (
									!alreadyInCart ? (
										<Button
											type='button'
											text={tProduct('button-1')}
											onClick={toggleForDelivery}
										/>
									) : (
										<Button
											type='button'
											text={tProduct('button-2')}
											disabled
										/>
									)
								) : (
									<></>
								)}
								{canGoBack ? (
									<BackButton text={tProduct('button-3')} />
								) : (
									<CustomLink
										to='/gallery'
										text={tProduct('button-3')}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
			</Transition>

			<AddToCartPopup
				id={product.id}
				show={showPopup}
				setShow={setShowPopup}
				flashMessage={flashPopupMessage}
			/>

			{showPopupMessage && (
				<div className='fixed top-[70px] right-8 bg-gray-800 text-white py-2.5 px-5 rounded shadow-lg text-base z-[1000] fadeInOutAnimation'>
					<p>{tProduct('added-message')}</p>
				</div>
			)}
		</>
	);
};

export default Product;
