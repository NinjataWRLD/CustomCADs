import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import useGetProduct from '@/hooks/queries/products/gallery/useGetGalleryProduct';
import useGenerateBlobUrl from '@/hooks/useGenerateBlobUrl';
import useDownloadProductImage from '@/hooks/queries/products/gallery/useDownloadProductImage';
import useCartUpdates from '@/hooks/contexts/useCartUpdates';
import { useFetchTranslation } from '@/hooks/locales/common/messages';
import { useCartTranslation } from '@/hooks/locales/pages/public';
import Checkbox from '@/app/components/fields/checkbox';
import { CartItem as ICartItem } from '@/types/cart-item';
import styles from './styles.module.css';

type AddToCostFunc = (amount: number) => void;

interface CartItemProps {
	item: ICartItem;
	addToCost: { total: AddToCostFunc; delivery: AddToCostFunc };
}

const CartItem = ({
	item: { productId, forDelivery, quantity },
	addToCost,
}: CartItemProps) => {
	const navigate = useNavigate();
	const tFetch = useFetchTranslation();
	const tCart = useCartTranslation();

	const {
		removeItem,
		incrementItemQuantity,
		decrementItemQuantity,
		toggleItemForDelivery,
	} = useCartUpdates();

	const { data: file, isError: isFileError } = useDownloadProductImage({
		id: productId,
	});
	const { data: product, isError } = useGetProduct({ id: productId });
	const blobUrl = useGenerateBlobUrl(file?.presignedUrl, file?.contentType);

	const updateCosts = (amount: number) => {
		addToCost.total(amount);
		if (forDelivery) addToCost.delivery(amount);
	};

	useEffect(() => {
		if (product) updateCosts(quantity * product.price);
	}, [productId, product]);

	const remove = () => {
		removeItem(productId);
		if (product) updateCosts(-1 * quantity * product.price);
	};
	const incrementQuantity = () => {
		incrementItemQuantity(productId);
		if (product) updateCosts(product.price);
	};
	const decrementQuantity = () => {
		decrementItemQuantity(productId);
		if (quantity > 1 && product) updateCosts(-1 * product.price);
	};
	const toggleForDelivery = () => {
		toggleItemForDelivery(productId);
		if (product) {
			if (forDelivery) addToCost.delivery(-1 * quantity * product.price);
			else addToCost.delivery(quantity * product.price);
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
								id={product.id + forDelivery}
								label={tCart('delivery')}
								checked={forDelivery}
								onClick={toggleForDelivery}
							/>
						</div>
					</h2>
					{blobUrl && <img src={blobUrl} alt='Item Image' />}
				</div>
				<div className={styles.data}>
					<h2>{product.name}</h2>
					<p>{tCart('by', { by: product.creatorName })}</p>
					<div className={styles.quantity}>
						<FontAwesomeIcon
							icon={faMinus}
							onClick={decrementQuantity}
						/>
						<div className={styles.number}>{quantity}</div>
						<FontAwesomeIcon
							icon={faPlus}
							onClick={incrementQuantity}
						/>
					</div>
					<button
						className={styles.btn}
						onClick={() => navigate(`/gallery/${productId}`)}
					>
						<span>{tCart('view')}</span>
					</button>
					<p className={styles.price}>${product.price * quantity}</p>
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
