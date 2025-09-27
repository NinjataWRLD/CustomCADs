import { Route } from '@/routes/_public/gallery';
import { useDropdown } from '@/hooks/useDropdown';
import { useGetProductSortings } from '@/hooks/queries/products/gallery';
import { usePlaceholdersTranslation } from '@/hooks/locales/common/messages';
import Categories from '@/app/components/search/categories';
import Searchbar from '@/app/components/search/searchbar';
import Sortings from '@/app/components/search/sortings';

export const useGalleryDropdowns = () => {
	const tPlaceholders = usePlaceholdersTranslation();

	const navigate = Route.useNavigate();
	const search = Route.useSearch();

	const sortings = useGetProductSortings();
	const dropdown = useDropdown<'categories' | 'sorting'>();

	return {
		Categories: () => (
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
				isActive={dropdown.is('categories')}
				setActive={(active) => dropdown.set(active, 'categories')}
			/>
		),
		Searchbar: () => (
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
		),
		Sortings: () => (
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
				isActive={dropdown.is('sorting')}
				setActive={(active) => dropdown.set(active, 'sorting')}
			/>
		),
	};
};
