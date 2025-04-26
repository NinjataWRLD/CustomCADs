import { useState, useEffect } from 'react';
import { Route } from '@/routes/_public/gallery';
import { usePagination } from '@/hooks/usePagination';
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

	const { gallery: products } = Route.useLoaderData();
	const navigate = Route.useNavigate();
	const search = Route.useSearch();

	const [total, setTotal] = useState(0);
	const { page, limit, handlePageChange } = usePagination(
		total,
		search.limit ?? 12,
	);

	const [isCategoriesActive, setCategoriesActive] = useState(false);
	const [isSortingsActive, setSortingsActive] = useState(false);

	useEffect(() => {
		navigate({
			search: (prev) => ({
				...prev,
				page,
				limit,
			}),
		});
	}, [page, limit]);

	useEffect(() => {
		if (products?.count) {
			setTotal(products.count);
		}
	}, [products]);

	return (
		<Transition>
			<section className={`${styles.gallery}`}>
				<div className={styles.toolbar}>
					<Categories
						getCategory={() => search.categoryName}
						updateCategory={(category) => {
							navigate({
								search: (prev) => ({
									...prev,
									categoryName: category?.name,
								}),
							});
						}}
						isActive={isCategoriesActive}
						setActive={(active) => {
							setCategoriesActive(active);
							if (active) setSortingsActive(false);
						}}
					/>
					<Searchbar
						placeholder={tPlaceholders('search-products')}
						getName={() => search.name}
						updateName={(name) => {
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
							type: search.sortingType,
							direction: search.sortingDirection,
						})}
						updateSorting={({ type, direction }) => {
							navigate({
								search: (prev) => ({
									...prev,
									sortingType: type ?? prev.sortingType,
									sortingDirection: direction,
								}),
							});
						}}
						isActive={isSortingsActive}
						setActive={(active) => {
							setSortingsActive(active);
							if (active) setCategoriesActive(false);
						}}
					/>
				</div>
				{products?.items.length ? (
					<div className={`${styles.models}`}>
						{products.items.map((product) => (
							<Item key={product.id} product={product} />
						))}
					</div>
				) : (
					<div className={`${styles.empty}`}>
						{tFetch('no-products')}
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
		</Transition>
	);
};

export default Gallery;
