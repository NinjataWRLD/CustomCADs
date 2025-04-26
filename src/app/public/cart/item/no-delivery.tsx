import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
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
import { CartItemWithoutDelivery as Item } from '@/types/cart-item';
import * as money from '@/utils/money';
import styles from './styles.module.css';

interface CartItemProps {
	item: Item;
	resetPrice: VoidFunction;
	addToPrice: (price: number) => void;
}

const CartItemWithoutDelivery = ({
	item,
	addToPrice,
	resetPrice,
}: CartItemProps) => {
	const navigate = useNavigate();

	const tFetch = useFetchTranslation();
	const tCart = useCartTranslation();

	const { removeItem } = useCartUpdates();

	const { data: image, isError: isFileError } = useDownloadProductImage({
		id: item.productId,
	});
	const blobUrl = useGenerateBlobUrl(image);

	const { data: product, isError } = useGetProduct({ id: item.productId });
	const isPrintable = product?.tags.includes('Printable');

	useEffect(() => {
		resetPrice();
		if (product) addToPrice(product.price);
	}, [product]);

	if (!product) {
		return <></>;
	}

	const remove = () => {
		addToPrice(-1 * product.price);
		removeItem(item.productId);
		removeRecord(item.productId);
	};
	const editorRedidrect = () =>
		navigate({
			to: '/editor/$id',
			params: { id: item.productId },
		});

	if (isError || !product || isFileError) {
		return <>{tFetch('error')}</>;
	}

	return (
		<div className={styles.purchase}>
			<div className={styles.content}>
				<div className={styles.head}>
					{isPrintable && (
						<h2>
							<div>
								<Checkbox
									id={item.productId}
									label={tCart('delivery')}
									checked={false}
									onClick={editorRedidrect}
								/>
							</div>
						</h2>
					)}
					{blobUrl && <img src={blobUrl} alt='Item Image' />}
				</div>
				<div className={styles.data}>
					<h2>{product.name}</h2>
					<p>{tCart('by', { by: product.creatorName })}</p>
					<p>
						{tCart('product-price', {
							price: money.format(
								money.fromBase({ money: product.price }),
							),
						})}
					</p>
					<div className={styles.buttons}>
						<button
							className={styles.btn}
							onClick={() =>
								navigate({
									to: `/gallery/$id`,
									params: { id: item.productId },
								})
							}
						>
							<span>{tCart('view')}</span>
						</button>
						<button
							className={`${styles.btn} ${styles['bin-btn']}`}
							onClick={remove}
						>
							<FontAwesomeIcon icon={faTrashCan} />
						</button>
					</div>
				</div>
				<div className={styles.blur}></div>
			</div>
		</div>
	);
};

export default CartItemWithoutDelivery;
