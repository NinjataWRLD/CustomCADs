import { useState, useEffect } from 'react';
import usePagination from '@/hooks/usePagination';
import useGetProducts from '@/hooks/queries/products/gallery/useGetGalleryProducts';
import { GallerySearch } from '@/app/types/search';
import Transition from '@/app/components/transition/transition';
import Categories from '@/app/components/search/categories/categories';
import Searchbar from '@/app/components/search/searchbar/searchbar';
import Sortings from '@/app/components/search/sortings/sortings';
import Pagination from '@/app/components/pagination/pagination';
import Model from './components/model';
import styles from './styles.module.css';

const Gallery = () => {
	const [search, setSearch] = useState<GallerySearch>({
		name: undefined,
		categoryId: undefined,
		sortingType: undefined,
		sortingDirection: undefined,
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
							updateSearch={(categoryId: number) =>
								setSearch((prev) => ({
									...prev,
									categoryId: categoryId,
								}))
							}
						/>
						<Searchbar
							updateSearch={(name: string) =>
								setSearch((prev) => ({
									...prev,
									name: name,
								}))
							}
						/>
						<Sortings
							updateSearch={(
								sorting: string,
								direction: string,
							) =>
								setSearch((prev) => ({
									...prev,
									sortingType: sorting,
									sortingDirection: direction,
								}))
							}
						/>
					</div>
					{products?.items.length === 0 ? (
						<>No Models</>
					) : (
						<div className={`${styles.models}`}>
							{products?.items?.map((product) => (
								<Model key={product.id} product={product} />
							))}
						</div>
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
