import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import useGetProduct from '@/hooks/queries/products/gallery/useGetGalleryProduct';
import useGenerateBlobUrl from '@/hooks/useGenerateBlobUrl';
import useDownloadProductImage from '@/hooks/queries/products/gallery/useDownloadProductImage';
import useCartUpdates from '@/hooks/contexts/useCartUpdates';
import useEditorStore from '@/hooks/stores/useEditorStore';
import { useFetchTranslation } from '@/hooks/locales/common/messages';
import { useCartTranslation } from '@/hooks/locales/pages/public';
import { removeRecord } from '@/stores/editor-store';
import Checkbox from '@/app/components/fields/checkbox';
import { CartItem as Item } from '@/types/cart-item';
import formatter from '../formatter';
import styles from './styles.module.css';

type AddToCostFunc = (amount: number) => void;

interface CartItemProps {
	item: Item;
	addToCost: { total: AddToCostFunc; delivery: AddToCostFunc };
}

const CartItem = ({
	item: { productId, forDelivery, quantity },
	addToCost,
}: CartItemProps) => {
	const navigate = useNavigate();
	const store = useEditorStore(productId);

	const tFetch = useFetchTranslation();
	const tCart = useCartTranslation();

	const {
		removeItem,
		incrementItemQuantity,
		decrementItemQuantity,
		toggleItemNoDelivery,
	} = useCartUpdates();

	const { data: file, isError: isFileError } = useDownloadProductImage({
		id: productId,
	});
	const { data: product, isError } = useGetProduct({ id: productId });
	const blobUrl = useGenerateBlobUrl(file?.presignedUrl, file?.contentType);

	const updateCosts = (productCost: number, customizationCost: number) => {
		addToCost.total(productCost);
		if (forDelivery) {
			addToCost.delivery(productCost);

			addToCost.total(customizationCost);
			addToCost.delivery(customizationCost);
		}
	};

	useEffect(() => {
		if (product) {
			updateCosts(quantity * product.price, quantity * store.cost);
		}
	}, [product]);

	if (!product) {
		return <></>;
	}

	const subtract = (money: number) => -1 * quantity * money;

	const remove = () => {
		removeItem(productId);
		updateCosts(
			subtract(product.price),
			forDelivery ? subtract(store.cost) : 0,
		);
		removeRecord(productId);
	};
	const incrementQuantity = () => {
		incrementItemQuantity(productId);
		updateCosts(product.price, forDelivery ? store.cost : 0);
	};
	const decrementQuantity = () => {
		decrementItemQuantity(productId);
		if (quantity > 1) {
			updateCosts(-1 * product.price, forDelivery ? -1 * store.cost : 0);
		}
	};
	const toggleForDelivery = async () => {
		if (forDelivery) {
			await toggleItemNoDelivery(productId);
			addToCost.delivery(subtract(product.price));
			addToCost.delivery(subtract(store.cost));
			addToCost.total(subtract(store.cost));
		} else navigate(`/editor/${productId}`, { state: { allow: true } });
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
					{forDelivery && (
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
					)}
					<button
						className={styles.btn}
						onClick={() => navigate(`/gallery/${productId}`)}
					>
						<span>{tCart('view')}</span>
					</button>
					{forDelivery && (
						<>
							<button
								className={styles.btn}
								style={{ bottom: '10%' }}
								onClick={() =>
									navigate(`/editor/${productId}`, {
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
							price: formatter.price(product.price * quantity),
						})}
					</p>
					{forDelivery && (
						<p>
							{tCart('customization-cost', {
								cost: formatter.price(store.cost * quantity),
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
