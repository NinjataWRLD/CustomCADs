import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import useGetTags from '@/hooks/queries/tags/useGetTags';
import useGetProducts from '@/hooks/queries/products/gallery/useGetGalleryProducts';
import { useHomeTranslation } from '@/hooks/locales/pages/public';
import BtnLink from '@/app/components/button/button';
import Model from './popular-model';
import styles from './popular.module.css';

const MostPopularModels = () => {
	const tHome = useHomeTranslation();
	const [currentId, setCurrentId] = useState('');

	const { data: tags } = useGetTags();
	const popularTag = tags?.find((x) => x.name === 'Popular');

	const { data: products } = useGetProducts(
		{
			page: 1,
			limit: 10,
			tagIds: popularTag ? [popularTag.id] : undefined,
		},
		!!tags,
	);

	useEffect(() => {
		if (products) {
			setCurrentId(products.items[0].id);
		}
	}, [products]);

	if (!products) {
		return <></>;
	}

	const findIndex = (id: string) =>
		products.items.findIndex((p) => p.id === id);

	const handlePrev = () => {
		setCurrentId((prev) => {
			const newIndex = findIndex(prev) - 1;
			if (newIndex === -1) {
				return products.items[0].id;
			}

			return products.items[newIndex].id;
		});
	};

	const handleNext = () => {
		setCurrentId((prev) => {
			const newIndex = findIndex(prev) + 1;
			if (newIndex === products.count) {
				return products.items[0].id;
			}

			return products.items[newIndex].id;
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
					{products.items.map((product) => {
						const productIndex = findIndex(product.id);

						const prevIndex =
							(currentIndex - 1 + products.count) %
							products.count;
						const nextIndex = (currentIndex + 1) % products.count;

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
									<Model product={product} />
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
					<BtnLink
						text={tHome('popular-gallery-btn')}
						link='/gallery'
					></BtnLink>
				</div>
			</div>
		</>
	);
};

export default MostPopularModels;
