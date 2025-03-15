import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { removeRecord } from '@/stores/editor-store';
import Checkbox from '@/app/components/fields/checkbox';
import { CartItem as Item } from '@/types/cart-item';
import * as formatter from '../formatter';
import styles from './styles.module.css';

interface CartItemProps {
	item: Item;
	reset: { price: VoidFunction; cost: VoidFunction };
	addTo: { price: (price: number) => void; cost: (cost: number) => void };
}

const CartItem = ({ item, addTo, reset }: CartItemProps) => {
	const navigate = useNavigate();

	const tFetch = useFetchTranslation();
	const tCart = useCartTranslation();

	const {
		removeItem,
		incrementItemQuantity,
		decrementItemQuantity,
		toggleItemNoDelivery,
	} = useCartUpdates();

	const { data: file, isError: isFileError } = useDownloadProductImage({
		id: item.productId,
	});
	const { data: product, isError } = useGetProduct({ id: item.productId });
	const blobUrl = useGenerateBlobUrl(file?.presignedUrl, file?.contentType);

	const id = item.forDelivery ? item.customizationId : '';
	const { data: customization } = useGetCustomization({ id }, !!id);

	useEffect(() => {
		reset.price();
		if (product) addTo.price(product.price * item.quantity);
	}, [product]);

	useEffect(() => {
		reset.cost();
		if (customization) addTo.cost(customization.cost * item.quantity);
	}, [customization]);

	if (!product) {
		return <></>;
	}

	const remove = () => {
		addTo.price(-1 * product.price * item.quantity);
		addTo.cost(-1 * (customization?.cost ?? 0) * item.quantity);

		removeItem(item.productId);
		removeRecord(item.productId);
	};
	const incrementQuantity = () => {
		incrementItemQuantity(item.productId);
		addTo.price(product.price);
		addTo.cost(customization?.cost ?? 0);
	};
	const decrementQuantity = () => {
		decrementItemQuantity(item.productId);
		if (item.quantity > 1) {
			addTo.price(-1 * product.price);
			addTo.cost(-1 * (customization?.cost ?? 0));
		}
	};
	const toggleDelivery = async () => {
		if (item.forDelivery) {
			addTo.price(-1 * product.price * (item.quantity - 1));
			addTo.cost(-1 * (customization?.cost ?? 0) * item.quantity);

			await toggleItemNoDelivery(item.productId);
		} else {
			navigate(`/editor/${item.productId}`, { state: { allow: true } });
		}
	};

	if (isError || !product || isFileError) {
		return <>{tFetch('error')}</>;
	}

	return (
		<div className={styles.purchase}>
			<div className={styles.content}>
				<div className={styles.head}>
					<h2>
						<div>
							<Checkbox
								id={item.productId}
								label={tCart('delivery')}
								checked={item.forDelivery}
								onClick={toggleDelivery}
							/>
						</div>
					</h2>
					{blobUrl && <img src={blobUrl} alt='Item Image' />}
				</div>
				<div className={styles.data}>
					<h2>{product.name}</h2>
					<p>{tCart('by', { by: product.creatorName })}</p>
					{item.forDelivery && (
						<div className={styles.quantity}>
							<FontAwesomeIcon
								icon={faMinus}
								onClick={decrementQuantity}
							/>
							<div className={styles.number}>{item.quantity}</div>
							<FontAwesomeIcon
								icon={faPlus}
								onClick={incrementQuantity}
							/>
						</div>
					)}
					<button
						className={styles.btn}
						onClick={() => navigate(`/gallery/${item.productId}`)}
					>
						<span>{tCart('view')}</span>
					</button>
					{item.forDelivery && (
						<>
							<button
								className={styles.btn}
								style={{ bottom: '10%' }}
								onClick={() =>
									navigate(`/editor/${item.productId}`, {
										state: { allow: true },
									})
								}
							>
								<span>{tCart('customize')}</span>
							</button>
						</>
					)}
					<p>
						{tCart('product-price', {
							price: formatter.price(product.price),
						})}
					</p>
					{item.forDelivery && (
						<p>
							{tCart('customization-cost', {
								cost: formatter.price(customization?.cost ?? 0),
							})}
						</p>
					)}
					<div
						className={styles.bin}
						data-tooltip={tCart('remove')}
						onClick={remove}
					>
						<FontAwesomeIcon icon={faTrashCan} />
					</div>
				</div>
			</div>
			<div className={styles.blur}></div>
		</div>
	);
};

export default CartItem;
