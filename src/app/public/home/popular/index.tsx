import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Response as Product } from '@/api/catalog/products/gallery/all';
import { useHomeTranslation } from '@/hooks/locales/pages/public';
import CustomLink from '@/app/components/link';
import Item from './item';
import styles from './styles.module.css';

interface PopularProductsProps {
	total: number;
	products: Product[];
}

const PopularProducts = ({ total, products }: PopularProductsProps) => {
	const tHome = useHomeTranslation();
	const [currentId, setCurrentId] = useState('');

	useEffect(() => {
		if (products.length) {
			setCurrentId(products[0].id);
		}
	}, [products]);

	const findIndex = (id: string) => products.findIndex((p) => p.id === id);

	const handlePrev = () => {
		setCurrentId((prev) => {
			const newIndex = findIndex(prev) - 1;
			if (newIndex === -1) {
				return products[0].id;
			}

			return products[newIndex].id;
		});
	};

	const handleNext = () => {
		setCurrentId((prev) => {
			const newIndex = findIndex(prev) + 1;
			if (newIndex === total) {
				return products[0].id;
			}

			return products[newIndex].id;
		});
	};

	const currentIndex = findIndex(currentId);
	return (
		<>
			<div className={`${styles.models}`}>
				<div className={styles.left} onClick={handlePrev}>
					<FontAwesomeIcon icon={faAngleLeft} />
				</div>
				<div
					className={styles.popular}
					style={
						{
							'--current-index': currentIndex,
						} as React.CSSProperties
					}
				>
					{products.map((product) => {
						const productIndex = findIndex(product.id);

						const prevIndex = (currentIndex - 1 + total) % total;
						const nextIndex = (currentIndex + 1) % total;

						if (
							productIndex === prevIndex ||
							productIndex === currentIndex ||
							productIndex === nextIndex
						) {
							return (
								<div
									key={product.id}
									className={`${styles.mod} ${product.id === currentId ? styles.active : ''}`}
								>
									<Item product={product} />
								</div>
							);
						}
						return null;
					})}
				</div>
				<div className={styles.right} onClick={handleNext}>
					<FontAwesomeIcon icon={faAngleRight} />
				</div>
				<div className={`${styles.btn}`}>
					<CustomLink
						to='/gallery'
						text={tHome('popular-gallery-btn')}
					/>
				</div>
			</div>
		</>
	);
};

export default PopularProducts;
