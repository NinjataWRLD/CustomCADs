import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import useGetProduct from '@/hooks/queries/products/gallery/useGetGalleryProduct';
import useGenerateBlobUrl from '@/hooks/useGenerateBlobUrl';
import useBytesToBuffer from '@/hooks/useBytesToBuffer';
import useDownloadProductImage from '@/hooks/queries/products/gallery/useDownloadProductImage';
import Checkbox from '@/app/components/fields/checkbox';
import { CartItem as ICartItem } from '@/types/cart-item';
import styles from './cart-item.module.css';

interface CartItemProps {
	item: ICartItem;
	removeItem: (id: string) => void;
	incrementQuantity: (id: string) => void;
	decrementQuantity: (id: string) => void;
	toggleDelivery: (id: string) => void;
}

const CartItem = ({
	item: { productId, forDelivery, quantity },
	removeItem: remove,
	incrementQuantity: increment,
	decrementQuantity: decrement,
	toggleDelivery: toggle,
}: CartItemProps) => {
	const navigate = useNavigate();
	const { data: product, isError } = useGetProduct({ id: productId });

	const { data: file, isError: isFileError } = useDownloadProductImage({
		id: productId,
	});

	const presignedUrl: string = file?.presignedUrl ?? '';
	const contentType: string = file?.contentType ?? '';

	const buffer = useBytesToBuffer(presignedUrl, contentType);
	const blobUrl = useGenerateBlobUrl(contentType, buffer);

	if (isError || !product || isFileError) {
		return <>Error!</>;
	}

	return (
		<div className={styles.purchase}>
			<div className={styles.content}>
				<div className={styles.head}>
					<h2>
						<div>
							<Checkbox
								id={product.id + forDelivery}
								label='Delivery'
								checked={forDelivery}
								onClick={() => toggle(productId)}
							/>
						</div>
					</h2>
					<img src={blobUrl} alt='image' />
				</div>
				<div className={styles.data}>
					<h2>{product.name}</h2>
					<p>By {product.creatorName}</p>
					<div className={styles.quantity}>
						<FontAwesomeIcon
							icon={faMinus}
							onClick={() => decrement(productId)}
						/>
						<div className={styles.number}>{quantity}</div>
						<FontAwesomeIcon
							icon={faPlus}
							onClick={() => increment(productId)}
						/>
					</div>
					<button
						className={styles.btn}
						onClick={() => navigate(`/gallery/${productId}`)}
					>
						<span>View</span>
					</button>
					<p className={styles.price}>${product.price * quantity}</p>
					<div
						className={styles.bin}
						data-tooltip='Remove'
						onClick={() => remove(productId)}
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
