import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useGetCustomization } from '@/hooks/queries/customizations';
import {
	useGetProduct,
	useDownloadProductImage,
} from '@/hooks/queries/products/gallery';
import { useGenerateBlobUrl } from '@/hooks/useGenerateBlobUrl';
import { useCartUpdates } from '@/hooks/contexts/useCartUpdates';
import { useFetchTranslation } from '@/hooks/locales/common/messages';
import { useCartTranslation } from '@/hooks/locales/pages/public';
import * as editorStore from '@/stores/editor-store';
import Checkbox from '@/app/components/fields/checkbox';
import { CartItemForDelivery as Item } from '@/types/cart-item';
import * as money from '@/utils/money';

interface CartItemProps {
	item: Item;
	reset: { price: VoidFunction; cost: VoidFunction };
	addTo: { price: (price: number) => void; cost: (cost: number) => void };
}

const CartItemForDelivery = ({ item, addTo, reset }: CartItemProps) => {
	const navigate = useNavigate();
	const tFetch = useFetchTranslation();
	const tCart = useCartTranslation();

	const {
		removeItem,
		incrementItemQuantity,
		decrementItemQuantity,
		toggleItemNoDelivery,
	} = useCartUpdates();

	const { data: image, isError: isFileError } = useDownloadProductImage({
		id: item.productId,
	});
	const blobUrl = useGenerateBlobUrl(image);

	const { data: product, isError } = useGetProduct({ id: item.productId });
	const isPrintable = product?.tags.includes('Printable');

	const { data: customization } = useGetCustomization({
		id: item.customizationId,
	});

	useEffect(() => {
		reset.price();
		if (product) addTo.price(product.price * item.quantity);
	}, [product]);

	useEffect(() => {
		reset.cost();
		if (customization) addTo.cost(customization.cost * item.quantity);
	}, [customization]);

	if (!product || !customization) return <></>;

	const remove = async () => {
		addTo.price(-1 * product.price * item.quantity);
		addTo.cost(-1 * customization.cost * item.quantity);

		await removeItem(item.productId);
		editorStore.removeRecord(item.productId);
	};
	const incrementQuantity = async () => {
		await incrementItemQuantity(item.productId);
		addTo.price(product.price);
		addTo.cost(customization.cost);
	};
	const decrementQuantity = async () => {
		await decrementItemQuantity(item.productId);
		if (item.quantity > 1) {
			addTo.price(-1 * product.price);
			addTo.cost(-1 * customization.cost);
		}
	};
	const setNoDelivery = async () => {
		addTo.price(-1 * product.price * (item.quantity - 1));
		addTo.cost(-1 * customization.cost * item.quantity);
		await toggleItemNoDelivery(item.productId);
	};

	if (isError || !product || isFileError) {
		return <>{tFetch('error')}</>;
	}

	return (
		<div className='flex flex-col w-[90%] bg-[hsla(267,42%,10%,0.79)] overflow-hidden shadow-[0_4px_6px_rgba(0,0,0,0.1)] gap-4 relative p-[0.3rem] rounded-[1rem]'>
			<div className='flex items-center gap-8 bg-[hsla(300,14%,15%,0.445)] text-[white] relative z-[1] p-4 rounded-2xl'>
				<div className='flex flex-col items-center gap-2 w-[30%]'>
					{blobUrl && (
						<img
							className='w-full aspect-[1/1] object-cover object-center rounded-[20%] border-[5px] border-solid border-[hsla(259,59%,70%,0.371)]'
							src={blobUrl}
							alt='Item Image'
						/>
					)}
				</div>
				<div className='flex flex-col gap-2 grow'>
					<div className='w-full flex items-center justify-between'>
						<h2 className='m-0'>{product.name}</h2>
						{isPrintable && (
							<div className='font-bold mr-[30%]'>
								<Checkbox
									id={item.productId}
									label={tCart('delivery')}
									onClick={setNoDelivery}
									checked
								/>
							</div>
						)}
					</div>
					<div className='relative w-full flex items-center justify-between'>
						<p>{tCart('by', { by: product.creatorName })}</p>
						<div className='flex items-center gap-2 bg-[rgba(255,255,255,0.305)] text-[white] w-fit text-[1.2rem] px-4 py-2 rounded-[20px] mr-[11%]'>
							<FontAwesomeIcon
								icon={faMinus}
								onClick={decrementQuantity}
								className='text-[rgb(213,177,235)] cursor-pointer hover:text-gray'
							/>
							<div className='min-w-[20px] text-center'>
								{item.quantity}
							</div>
							<FontAwesomeIcon
								icon={faPlus}
								onClick={incrementQuantity}
								className='text-[rgb(213,177,235)] cursor-pointer hover:text-gray'
							/>
						</div>
					</div>
					<div className='relative w-full flex flex-col gap-4'>
						<p className='m-0'>
							{tCart('product-price', {
								price: money.format(
									money.fromBase({
										money: product.price,
									}),
								),
							})}
						</p>
						<p className='m-0'>
							{tCart('customization-cost', {
								cost: money.format(
									money.fromBase({
										money: customization.cost,
									}),
								),
							})}
						</p>
					</div>
					<div className='relative w-full flex flex-row items-center justify-start gap-2.5 mt-3'>
						<div
							className='relative overflow-hidden bg-purple-700 text-indigo-50 py-3.5 px-8 text-base font-bold tracking-wider rounded-full cursor-pointer w-fit transition-colors duration-400 group'
							onClick={() =>
								navigate({
									to: '/editor/$id',
									params: { id: item.productId },
								})
							}
						>
							<span className='relative z-10 transition-colors duration-400 text-white/75 group-hover:text-white'>
								{tCart('customize')}
							</span>
							<div className='absolute top-0 -left-[10%] w-[120%] h-full bg-black skew-x-30 transform transition-transform duration-400 ease-out origin-left group-hover:translate-x-full z-0'></div>
						</div>
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

export default CartItemForDelivery;
