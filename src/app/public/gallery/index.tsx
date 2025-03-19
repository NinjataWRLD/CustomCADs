import { useState, useEffect } from 'react';
import { Route } from '@/routes/_public/gallery';
import { Request as GallerySearch } from '@/api/catalog/products/gallery/resources/all';
import { usePagination } from '@/hooks/usePagination';
import { useGetProducts } from '@/hooks/queries/products/gallery';
import {
	useFetchTranslation,
	usePlaceholdersTranslation,
} from '@/hooks/locales/common/messages';
import Transition from '@/app/components/transition';
import Categories from '@/app/components/search/categories';
import Searchbar from '@/app/components/search/searchbar';
import Sortings from '@/app/components/search/sortings';
import Pagination from '@/app/components/pagination';
import Item from './item';
import styles from './styles.module.css';

const Gallery = () => {
	const tFetch = useFetchTranslation();
	const tPlaceholders = usePlaceholdersTranslation();

	const [total, setTotal] = useState(0);
	const { page, limit, handlePageChange } = usePagination(total, 12);

	const navigate = Route.useNavigate();
	const { name, categoryName, sortingType, sortingDirection } =
		Route.useSearch();

	const [search, setSearch] = useState<GallerySearch>({
		name: name,
		categoryId: undefined,
		sortingType: sortingType,
		sortingDirection: sortingDirection,
		limit: limit,
		page: page,
	});
	const { data: products } = useGetProducts(search);

	useEffect(() => {
		setSearch((prev) => ({
			...prev,
			page: page,
			limit: limit,
		}));
	}, [page, limit]);

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
							getCategory={() => categoryName}
							updateCategory={(category) => {
								setSearch((prev) => ({
									...prev,
									categoryId: category?.id,
								}));
								navigate({
									search: (prev) => ({
										...prev,
										categoryName: category?.name,
									}),
								});
							}}
						/>
						<Searchbar
							placeholder={tPlaceholders('search-products')}
							getName={() => name}
							updateName={(name) => {
								setSearch((prev) => ({
									...prev,
									name: name,
								}));
								navigate({
									search: (prev) => ({
										...prev,
										name: name,
									}),
								});
							}}
						/>
						<Sortings
							getSorting={() => ({
								type: sortingType,
								direction: sortingDirection,
							})}
							updateSorting={({ type, direction }) => {
								setSearch((prev) => ({
									...prev,
									sortingType: type ? type : prev.sortingType,
									sortingDirection: direction,
								}));
								navigate({
									search: (prev) => ({
										...prev,
										sortingType: type
											? type
											: prev.sortingType,
										sortingDirection: direction,
									}),
								});
							}}
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
