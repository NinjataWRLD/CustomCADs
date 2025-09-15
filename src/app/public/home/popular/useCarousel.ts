import { useEffect, useState } from 'react';
import { Response as Product } from '@/api/catalog/products/gallery/all';

export const useCarousel = (products: Product[]) => {
	const [currentId, setCurrentId] = useState('');
	useEffect(() => {
		if (products.length) {
			setCurrentId(products[0].id);
		}
	}, [products]);
	const findIndex = (id: string) => products.findIndex((p) => p.id === id);

	const handlePrev = () =>
		setCurrentId((prev) => {
			const newIndex = findIndex(prev) - 1;
			if (newIndex === -1) {
				return products[products.length - 1].id;
			}

			return products[newIndex].id;
		});

	const handleNext = () =>
		setCurrentId((prev) => {
			const newIndex = findIndex(prev) + 1;
			if (newIndex === products.length) {
				return products[0].id;
			}

			return products[newIndex].id;
		});

	return {
		index: {
			current: findIndex(currentId),
			prev:
				(findIndex(currentId) - 1 + products.length) % products.length,
			next: (findIndex(currentId) + 1) % products.length,
		},
		handlePrev,
		handleNext,
		findIndex,
	};
};
