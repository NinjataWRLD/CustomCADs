import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchTranslation } from '@/hooks/locales/common/messages';
import { useProductTranslation } from '@/hooks/locales/pages/public';
import useGetProduct from '@/hooks/queries/products/gallery/useGetGalleryProduct';
import Transition from '@/app/components/transition/transition';
import BtnLink from '@/app/components/button/button';
import Cad from '@/app/components/cad/cad';
import AddDetails from './components/add-details';
import styles from './styles.module.css';

const Product = () => {
	const { id } = useParams();

	const tFetch = useFetchTranslation();
	const tProduct = useProductTranslation();

	const {
		data: product,
		isLoading,
		isError,
	} = useGetProduct({ id: String(id) });

	const [addDetails, setAddDetails] = useState<boolean>(false);
	const toggleForDelivery = () => {
		setAddDetails((prev) => !prev);
	};
	const [showAddedMessage, setShowAddedMessage] = useState(false);

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
								<Cad
									id={product.id}
									cam={product.camCoordinates}
									pan={product.panCoordinates}
								/>
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
								<BtnLink
									className={`${styles.back}`}
									text={tProduct('button-1')}
									link='/viewer'
								/>
								<BtnLink
									onClick={toggleForDelivery}
									text={tProduct('button-2')}
									className={`${styles.back}`}
								/>
								<BtnLink
									className={`${styles.back}`}
									text={tProduct('button-3')}
									link='/gallery'
								/>
							</div>
							<p>*{tProduct('warning')}</p>
						</div>
					</div>
				</div>
			</Transition>
			<AddDetails
				id={product.id}
				show={addDetails}
				setShow={setAddDetails}
				setShowMessage={setShowAddedMessage}
			/>

			{showAddedMessage && (
				<div className={styles.cartMessage}>
					<p>{tProduct('added-message')}</p>
				</div>
			)}
		</>
	);
};

export default Product;
