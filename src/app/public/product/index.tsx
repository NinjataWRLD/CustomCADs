import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchTranslation } from '@/hooks/locales/common/messages';
import { useProductTranslation } from '@/hooks/locales/pages/public';
import useCartContext from '@/hooks/contexts/useCartContext';
import useGetProduct from '@/hooks/queries/products/gallery/useGetGalleryProduct';
import Transition from '@/app/components/transition';
import Btn from '@/app/components/button';
import Cad from '@/app/components/cad';
import AddToCartPopup from './add-to-cart-popup';
import styles from './styles.module.css';

const Product = () => {
	const { id } = useParams();

	const tFetch = useFetchTranslation();
	const tProduct = useProductTranslation();

	const { items } = useCartContext();
	const alreadyInCart = items.some((i) => i.productId === id);

	const {
		data: product,
		isLoading,
		isError,
	} = useGetProduct({ id: String(id) });

	const [showPopup, setShowPopup] = useState(false);
	const toggleForDelivery = () => {
		setShowPopup((prev) => !prev);
	};

	const [showPopupMessage, setShowPopupMessage] = useState(false);
	const flashPopupMessage = () => {
		setShowPopupMessage(true);

		setTimeout(() => {
			setShowPopupMessage(false);
		}, 3000);
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
									{product.price}
								</p>
								<p>
									<strong>{tProduct('uploaded-on')}</strong>
									{product.uploadDate}
								</p>
							</div>

							<div className={`${styles.buttons}`}>
								{!alreadyInCart ? (
									<Btn
										type='button'
										text={tProduct('button-1')}
										onClick={toggleForDelivery}
									/>
								) : (
									<Btn
										type='button'
										text={tProduct('button-2')}
										disabled
									/>
								)}
								<Btn
									type='link'
									text={tProduct('button-3')}
									link='/gallery'
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
