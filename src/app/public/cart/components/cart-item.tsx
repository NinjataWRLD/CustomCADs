import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import useGetProduct from '@/hooks/queries/products/gallery/useGetGalleryProduct';
import useGenerateBlobUrl from '@/hooks/useGenerateBlobUrl';
import useDownloadProductImage from '@/hooks/queries/products/gallery/useDownloadProductImage';
import useCartUpdates from '@/hooks/contexts/useCartUpdates';
import { useFetchTranslation } from '@/hooks/locales/common/messages';
import { useCartTranslation } from '@/hooks/locales/pages/public';
import Checkbox from '@/app/components/fields/checkbox/checkbox';
import { CartItem as ICartItem } from '@/types/cart-item';
import styles from './cart-item.module.css';

interface CartItemProps {
	item: ICartItem;
}

const CartItem = ({
	item: { productId, forDelivery, quantity },
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
								onClick={() => toggleItemForDelivery(productId)}
							/>
						</div>
					</h2>
					<img src={blobUrl} alt='image' />
				</div>
				<div className={styles.data}>
					<h2>{product.name}</h2>
					<p>{tCart('by', { by: product.creatorName })}</p>
					<div className={styles.quantity}>
						<FontAwesomeIcon
							icon={faMinus}
							onClick={() => decrementItemQuantity(productId)}
						/>
						<div className={styles.number}>{quantity}</div>
						<FontAwesomeIcon
							icon={faPlus}
							onClick={() => incrementItemQuantity(productId)}
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
						onClick={() => removeItem(productId)}
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
