import { useState, useEffect } from 'react';
import usePagination from '@/hooks/usePagination';
import useGetProducts from '@/hooks/queries/products/gallery/useGetGalleryProducts';
import {
	useFetchTranslation,
	usePlaceholdersTranslation,
} from '@/hooks/locales/common/messages';
import useSearchParams from '@/hooks/useSearchParams';
import Transition from '@/app/components/transition';
import Categories from '@/app/components/search/categories';
import Searchbar from '@/app/components/search/searchbar';
import Sortings from '@/app/components/search/sortings';
import Pagination from '@/app/components/pagination';
import Item from './item';
import styles from './styles.module.css';

interface GallerySearch {
	name?: string;
	categoryId?: number;
	sortingType?: string;
	sortingDirection?: string;
}

const Gallery = () => {
	const tFetch = useFetchTranslation();
	const tPlaceholders = usePlaceholdersTranslation();

	const { getParam } = useSearchParams();
	const nameParam = getParam('name');
	const sortingTypeParam = getParam('sortingType');
	const sortingDirectionParam = getParam('sortingDirection');

	const [search, setSearch] = useState<GallerySearch>({
		name: nameParam,
		categoryId: undefined,
		sortingType: sortingTypeParam,
		sortingDirection: sortingDirectionParam,
	});

	const [total, setTotal] = useState(0);
	const { page, limit, handlePageChange } = usePagination(total, 12);

	const { data: products } = useGetProducts({
		limit: limit,
		page: page,
		...search,
	});

	useEffect(() => {
		if (products?.count) {
			setTotal(products.count);
		}
	}, [products]);

	return (
		<Transition>
			<div className={`${styles.gallery}`}>
				<section className={`${styles.container}`}>
					<div className={styles.search}>
						<Categories
							updateSearch={(categoryId) =>
								setSearch((prev) => ({
									...prev,
									categoryId: categoryId ?? prev.categoryId,
								}))
							}
						/>
						<Searchbar
							placeholder={tPlaceholders('search-products')}
							updateSearch={(name) =>
								setSearch((prev) => ({
									...prev,
									name: name ?? prev.name,
								}))
							}
						/>
						<Sortings
							updateSearch={(sorting, direction) =>
								setSearch((prev) => ({
									...prev,
									sortingType: sorting ?? prev.sortingType,
									sortingDirection:
										direction ?? prev.sortingDirection,
								}))
							}
						/>
					</div>
					{products && products.items.length ? (
						<div className={`${styles.models}`}>
							{products.items.map((product) => (
								<Item key={product.id} product={product} />
							))}
						</div>
					) : (
						<>{tFetch('no-products')}</>
					)}
					<div className={`${styles.pagination}`}>
						<Pagination
							total={products?.count ?? 0}
							limit={limit}
							page={page}
							onPageChange={handlePageChange}
						/>
					</div>
				</section>
			</div>
		</Transition>
	);
};

export default Gallery;
