import { useState } from 'react';
import Model from './popular-model';
import BtnLink from '@/app/components/button/button';
import styles from './popular.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useHomeTranslation } from '@/hooks/locales/pages/public';
import { useCategoriesTranslation } from '@/hooks/locales/common/resources';

const MostPopularModels = () => {
	const tHome = useHomeTranslation();
	const tCategories = useCategoriesTranslation();
	const [currentIndex, setCurrentIndex] = useState(0);

	const products = [
		{
			index: 0,
			src: 'https://i.pinimg.com/736x/4c/a5/92/4ca592067318c81476d1b1857bd12479.jpg',
			name: tHome('popular-1-name'),
			category: tCategories('Electronics'),
			views: '1.590',
			price: '30$',
			author: 'Designer',
			upload_date: '12.12.2024',
		},
		{
			index: 1,
			src: 'https://i.pinimg.com/736x/ba/1d/a3/ba1da367b352136f712dfeb621ff158c.jpg',
			name: tHome('popular-2-name'),
			category: tCategories('Toys'),
			views: '3.973',
			price: '30$',
			author: 'Designer',
			upload_date: '12.12.2024',
		},
		{
			index: 2,
			src: 'https://i.pinimg.com/736x/51/e4/92/51e4925fa8940347ef3604146a7d132d.jpg',
			name: tHome('popular-3-name'),
			category: tCategories('Vehicles'),
			views: '1.772',
			price: '30$',
			author: 'Designer',
			upload_date: '12.12.2024',
		},
	];

	const handlePrev = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? products.length - 1 : prevIndex - 1,
		);
	};

	const handleNext = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === products.length - 1 ? 0 : prevIndex + 1,
		);
	};

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
						const prevIndex =
							(currentIndex - 1 + products.length) %
							products.length;
						const nextIndex = (currentIndex + 1) % products.length;

						if (
							product.index === prevIndex ||
							product.index === currentIndex ||
							product.index === nextIndex
						) {
							return (
								<div
									key={product.index}
									className={`${styles.mod} ${product.index === currentIndex ? styles.active : ''}`}
								>
									<Model
										key={product.index}
										model={product}
									/>
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
