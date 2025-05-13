import { useState, useEffect } from 'react';
import { Route } from '@/routes/_public/gallery';
import { usePagination } from '@/hooks/usePagination';
import {
	useFetchTranslation,
	usePlaceholdersTranslation,
} from '@/hooks/locales/common/messages';
import { useGetProductSortings } from '@/hooks/queries/products/gallery';
import Transition from '@/app/components/transition';
import Categories from '@/app/components/search/categories';
import Searchbar from '@/app/components/search/searchbar';
import Sortings from '@/app/components/search/sortings';
import Pagination from '@/app/components/pagination';
import Item from './item';

const GALLERY_ITEMS_PER_PAGE = 12;
const Gallery = () => {
	const tFetch = useFetchTranslation();
	const tPlaceholders = usePlaceholdersTranslation();

	const { gallery: products } = Route.useLoaderData();
	const navigate = Route.useNavigate();
	const search = Route.useSearch();

	const [total, setTotal] = useState(0);
	const { page, limit, handlePageChange } = usePagination(
		total,
		search.limit ?? GALLERY_ITEMS_PER_PAGE,
	);
	const sortings = useGetProductSortings();

	const [dropdown, setDropdown] = useState<'categories' | 'sorting'>();
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
		if (products.count) {
			setTotal(products.count);
		}
	}, [products]);

	return (
		<Transition>
			<section
				className='relative flex flex-col items-center justify-center text-[white] overflow-hidden gap-[2em] z-[80] px-[2em] py-[4em]'
				style={{
					background:
						'linear-gradient(to bottom,hsla(0, 0%, 0%, 0.327) 1%,hsla(0, 0%, 13%, 0.352) 60%,hsla(300, 58%, 23%, 0.585) 100%)',
				}}
			>
				<div className='relative flex justify-center w-full max-w-[1200px] gap-[30px] p-5'>
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
						isActive={dropdown === 'categories'}
						setActive={(active) =>
							setDropdown(active ? 'categories' : undefined)
						}
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
						fetch={sortings}
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
						isActive={dropdown === 'sorting'}
						setActive={(active) =>
							setDropdown(active ? 'sorting' : undefined)
						}
					/>
				</div>
				{products.items.length ? (
					<div className='w-4/5 flex flex-wrap justify-center gap-y-[100px] gap-x-[70px] p-5'>
						{products.items.map((product) => (
							<div
								key={product.id}
								className='flex-[0_0_calc((100%-140px)/3)]'
							>
								<Item product={product} />
							</div>
						))}
					</div>
				) : (
					<div className='min-h-[60dvh] flex items-center text-white text-2xl text-shadow-custom'>
						{tFetch('no-products')}
					</div>
				)}
				<div className='flex items-center justify-center'>
					<Pagination
						total={products.count ?? 0}
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
