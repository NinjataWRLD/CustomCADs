import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { AppError } from '@/types/errors';
import {
	useGetProduct,
	useDownloadProductImage,
} from '@/hooks/queries/products/gallery';
import { useCartUpdates } from '@/hooks/contexts/useCartUpdates';
import { useCartTranslation } from '@/hooks/locales/pages/public';
import { useMoney } from '@/hooks/money/useMoney';
import { removeRecord } from '@/stores/editor-store';
import Checkbox from '@/app/components/fields/checkbox';
import Loader from '@/app/components/state/loading';
import { CartItemWithoutDelivery as Item } from '@/types/cart-item';

type CartItemProps = {
	item: Item;
	resetPrice: VoidFunction;
	addToPrice: (price: number) => void;
};

const CartItemWithoutDelivery = ({
	item,
	addToPrice,
	resetPrice,
}: CartItemProps) => {
	const navigate = useNavigate();
	const tCart = useCartTranslation();

	const { removeItem } = useCartUpdates();
	const { data: image, isError: isFileError } = useDownloadProductImage({
		id: item.productId,
	});

	const { data: product, isError } = useGetProduct({ id: item.productId });
	const isPrintable = product?.tags.includes('Printable');

	useEffect(() => {
		resetPrice();
		if (product) addToPrice(product.price);
	}, [product]);

	const price = useMoney(product?.price ?? 0);
	if (!product) {
		return <Loader />;
	}

	const remove = () => {
		addToPrice(-1 * product.price);
		removeItem(item.productId);
		removeRecord(item.productId);
	};
	const editorRedirect = () =>
		navigate({
			to: '/editor/$id',
			params: { id: item.productId },
		});

	if (isError || isFileError) {
		throw new AppError({
			title: 'Server fetching error',
			message: 'There was an error while fetching data from the server.',
			tip: 'Please wait a few seconds, then refresh.',
		});
	}

	return (
		<div className='flex flex-col w-[90%] bg-[hsla(267,42%,10%,0.79)] overflow-hidden shadow-[0_4px_6px_rgba(0,0,0,0.1)] gap-4 relative p-[0.3rem] rounded-[1rem]'>
			<div className='flex items-center gap-8 bg-[hsla(300,14%,15%,0.445)] text-[white] relative z-[1] p-4 rounded-2xl'>
				<div className='flex flex-col items-center gap-2 w-[30%]'>
					<img
						className='w-full aspect-[1/1] object-cover object-center rounded-[20%] border-[5px] border-solid border-[hsla(259,59%,70%,0.371)]'
						src={image?.presignedUrl}
						alt='Item Image'
						loading='lazy'
					/>
				</div>
				<div className='relative flex flex-col grow'>
					<div className='w-full flex items-center justify-between'>
						<h2>{product.name}</h2>
						{isPrintable && (
							<div className='font-bold mr-[30%]'>
								<Checkbox
									id={item.productId}
									label={tCart('delivery')}
									checked={false}
									onClick={editorRedirect}
								/>
							</div>
						)}
					</div>
					<p className='m-0'>
						{tCart('by', { by: product.creatorName })}
					</p>
					<p className='mt-4'>{tCart('product-price', { price })}</p>
					<div className='relative w-full flex flex-row items-center justify-start gap-2.5'>
						<div
							className='relative overflow-hidden bg-purple-700 text-indigo-50 py-3.5 px-8 text-base font-bold tracking-wider rounded-full cursor-pointer w-fit transition-colors duration-400 group'
							onClick={() =>
								navigate({
									to: `/gallery/$id`,
									params: { id: item.productId },
								})
							}
						>
							<span className='relative z-10 transition-colors duration-400 text-white/75 group-hover:text-white'>
								{tCart('view')}
							</span>
							<div className='absolute top-0 -left-[10%] w-[120%] h-full bg-black skew-x-30 transform transition-transform duration-400 ease-out origin-left group-hover:translate-x-full z-0'></div>
						</div>
						<div
							className='relative overflow-hidden bg-red-600 text-white py-3.5 px-8 text-base font-bold tracking-wider rounded-full cursor-pointer w-fit transition-colors hover:bg-red-500 duration-400 group'
							onClick={remove}
						>
							<span className='relative z-10 transition-colors duration-400 text-white/75 group-hover:text-white'>
								<FontAwesomeIcon icon={faTrashCan} />
							</span>
							<div className='absolute top-0 -left-[10%] w-[120%] h-full bg-gray-300/25 skew-x-30 transform transition-transform duration-400 ease-out origin-left group-hover:translate-x-full z-0'></div>
						</div>
					</div>
				</div>
				<div className='absolute w-[10%] h-full blur-[100px] z-[2] pointer-events-none right-0 top-0 bg-purple-700'></div>
			</div>
		</div>
	);
};

export default CartItemWithoutDelivery;
