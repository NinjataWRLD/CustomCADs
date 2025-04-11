import { useState } from 'react';
import { Route } from '@/routes/_public/gallery/$id';
import { useCartUpdates } from '@/hooks/contexts/useCartUpdates';
import { useFetchTranslation } from '@/hooks/locales/common/messages';
import { useProductTranslation } from '@/hooks/locales/pages/public';
import { useCartContext } from '@/hooks/contexts/useCartContext';
import { useGetProduct } from '@/hooks/queries/products/gallery';
import Transition from '@/app/components/transition';
import Button from '@/app/components/button';
import CustomLink from '@/app/components/link';
import Cad from '@/app/components/cad';
import * as dateTime from '@/utils/date-time';
import * as money from '@/utils/money';
import AddToCartPopup from './add-to-cart-popup';
import styles from './styles.module.css';

const Product = () => {
	const { id } = Route.useParams();
	const { data: product, isLoading, isError } = useGetProduct({ id: id });
	const isPrintable = product?.tags.includes('Printable');

	const tFetch = useFetchTranslation();
	const tProduct = useProductTranslation();

	const { items } = useCartContext();
	const alreadyInCart = items?.some((i) => i.productId === id);
	const { addItem } = useCartUpdates();

	const [showPopupMessage, setShowPopupMessage] = useState(false);
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
				productId: id,
				forDelivery: false,
			});
			flashPopupMessage();
		}
	};

	if (isLoading) {
		return <>{tFetch('loading')}</>;
	}

	if (isError || !product) {
		return <>{tFetch('error')}</>;
	}

	return (
		<>
			<Transition>
				<div className={`${styles.container}`}>
					<div className={`${styles.product}`}>
						<div className={`${styles.model}`}>
							<div className={`${styles.visualizer}`}>
								<Cad type='gallery' product={product} />
							</div>
						</div>
						<div className={`${styles.details}`}>
							<div className={`${styles.info}`}>
								<h1>{product.name}</h1>
								<p>
									<strong>{tProduct('category')}</strong>
									{product.category.name}
								</p>
								<p>
									<strong>{tProduct('creator')}</strong>
									{product.creatorName}
								</p>
								<hr />
								<p className={`${styles.desc}`}>
									{product.description}
								</p>
								<hr />
								<p>
									<strong>{tProduct('price')}</strong>
									{money.format(
										money.fromBase({
											money: product.price,
										}),
									)}
								</p>
								<p>
									<strong>{tProduct('uploaded-on')}</strong>
									{dateTime.format({
										date: product.uploadedAt,
									})}
								</p>
							</div>

							<div className={`${styles.buttons}`}>
								{!alreadyInCart ? (
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
								)}
								<CustomLink
									to='/gallery'
									text={tProduct('button-3')}
								/>
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
				<div className={styles.cartMessage}>
					<p>{tProduct('added-message')}</p>
				</div>
			)}
		</>
	);
};

export default Product;
