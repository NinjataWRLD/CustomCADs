import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import useGetProduct from '@/hooks/queries/products/gallery/useGetGalleryProduct';
import Transition from '@/app/components/transition/transition';
import BtnLink from '@/app/components/button/button';
import Cad from '@/app/components/cad/cad';
import styles from './styles.module.css';
import { CartItem } from '@/types/cart-item';
import useCartContext from '@/hooks/useCartContext';

const Product = () => {
	const { id } = useParams();
	const {
		data: product,
		isLoading,
		isError,
	} = useGetProduct({ id: String(id) });
	const cart = useCartContext();

	const dropdownRef = useRef<HTMLDivElement>(null);
	const [addDetails, setAddDetails] = useState<boolean>(false);
	const toggleForDelivery = () => {
		setAddDetails((prev) => !prev);
	};
	const [showAddedMessage, setShowAddedMessage] = useState(false);

	if (isLoading) {
		return <>Loading...</>;
	}

	if (!product) {
		return <>Not Found.</>;
	}

	if (isError) {
		return <>Error!</>;
	}
	const addToCart = async (forDelivery: boolean) => {
		const weight = 5; // remove mock weight
		const item: CartItem = {
			productId: product.id,
			quantity: 1,
			weight: weight,
			forDelivery: forDelivery,
		};
		cart.items.push(item);

		setAddDetails(false);
		setShowAddedMessage(true);

		setTimeout(() => {
			setShowAddedMessage(false);
		}, 3000);
	};

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
									<strong>Category:</strong>{' '}
									{product.category.name}
								</p>
								<p>
									<strong>Made by:</strong>{' '}
									{product.creatorName}
								</p>
								<hr />
								<p className={`${styles.desc}`}>
									{product.description}
								</p>
								<hr />
								<p>
									<strong>Price:</strong> {product.price}
								</p>
								<p>
									<strong>Uploaded on:</strong>{' '}
									{product.uploadDate}
								</p>
							</div>

							<div className={`${styles.buttons}`}>
								<BtnLink
									className={`${styles.back}`}
									text='Customize'
									link='/viewer'
								/>
								<BtnLink
									onClick={toggleForDelivery}
									className={`${styles.back}`}
									text='Add to Cart'
								/>
								<BtnLink
									className={`${styles.back}`}
									text='Go Back'
									link='/gallery'
								/>
							</div>
							<p>*Customizing the model may reflect its price!</p>
						</div>
					</div>
				</div>
			</Transition>
			{addDetails && <div className={styles.blur}></div>}
			<div
				ref={dropdownRef}
				className={`${styles['buying-details']} ${addDetails ? styles.show : ''}`}
			>
				<div className={styles.close} onClick={toggleForDelivery}>
					<i className='fas fa-times'></i>
				</div>
				<h1>Choose your buying preference</h1>
				<div className={`${styles.buttons}`}>
					<button onClick={() => addToCart(false)}>
						<span>ONLY FILE</span>
					</button>
					<button onClick={() => addToCart(true)}>
						<span>FILE & SHIPMENT</span>
					</button>
				</div>

				<hr />

				<div className={`${styles.notes}`}>
					<p>
						<strong>*File</strong> - receive the selected product
						model as a file. No delivery, no extra fee.
					</p>
					<p>
						<strong>*Shipment</strong> - receive a printed model of
						the selected product, delivered to your location!
					</p>
				</div>
			</div>

			{showAddedMessage && (
				<div className={styles.cartMessage}>
					<p>Item added to cart!</p>
				</div>
			)}
		</>
	);
};

export default Product;
