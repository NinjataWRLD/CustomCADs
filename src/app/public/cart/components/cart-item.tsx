import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import styles from './cart-item.module.css';
import useGetProduct from '@/hooks/queries/products/gallery/useGetGalleryProduct';
import Checkbox from '@/app/components/fields/checkbox';
import useGenerateBlobUrl from '@/hooks/useGenerateBlobUrl';
import useBytesToBuffer from '@/hooks/useBytesToBuffer';
import useDownloadProductImage from '@/hooks/queries/products/gallery/useDownloadProductImage';

interface CartItemProps {
	productId: string;
	delivery?: boolean;
}

const CartItem = ({ productId, delivery }: CartItemProps) => {
	const { data: product, isError } = useGetProduct({ id: productId });
	const [forDelivery, setForDelivery] = useState(delivery ?? false);
	const [quantity, setQuantity] = useState(1);

	const { data: file, isError: isFileError } = useDownloadProductImage({
		id: productId,
	});

	const presignedUrl: string = file?.presignedUrl ?? '';
	const contentType: string = file?.contentType ?? '';

	const buffer = useBytesToBuffer(presignedUrl, contentType);
	const blobUrl = useGenerateBlobUrl(contentType, buffer);

	const increment = async () => {
		setQuantity((prev) => prev + 1);
	};
	const decrement = async () => {
		setQuantity((prev) => prev - 1);
	};
	const toggleDelivery = async () => {
		setForDelivery((prev) => !prev);
	};

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
								id={product.id + delivery}
								label='Delivery'
								checked={forDelivery}
								onClick={toggleDelivery}
							/>
						</div>
					</h2>
					<img src={blobUrl} alt='image' />
				</div>
				<div className={styles.data}>
					<h2>{product.name}</h2>
					<p>By {product.creatorName}</p>
					<div className={styles.quantity}>
						<FontAwesomeIcon icon={faMinus} onClick={decrement} />
						<div className={styles.number}>{quantity}</div>
						<FontAwesomeIcon icon={faPlus} onClick={increment} />
					</div>
					<button className={styles.btn}>
						<span>View</span>
					</button>
					<p className={styles.price}>${product.price * quantity}</p>
					<div className={styles.bin} data-tooltip='Remove'>
						<FontAwesomeIcon icon={faTrashCan} />
					</div>
				</div>
			</div>
			<div className={styles.blur}></div>
		</div>
	);
};

export default CartItem;
