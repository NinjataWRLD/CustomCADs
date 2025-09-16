import { Route } from '@/routes/_public/gallery';
import { useNotFoundTranslation } from '@/hooks/locales/common/messages';
import Transition from '@/app/components/transition';
import Pagination from '@/app/components/pagination';
import { useGalleryDropdowns } from './hooks/useGalleryDropdowns';
import Item from './item';

const GALLERY_ITEMS_PER_PAGE = 12;
const Gallery = () => {
	const { gallery: products } = Route.useLoaderData();
	const navigate = Route.useNavigate();

	const dropdowns = useGalleryDropdowns();
	const tNotFound = useNotFoundTranslation();

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
					{<dropdowns.Categories />}
					{<dropdowns.Searchbar />}
					{<dropdowns.Sortings />}
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
						{tNotFound('no-products')}
					</div>
				)}
				<div className='flex items-center justify-center'>
					<Pagination
						total={products.count}
						defaultLimit={GALLERY_ITEMS_PER_PAGE}
						navigate={(pagination) =>
							navigate({
								search: (prev) => ({
									...prev,
									...pagination,
								}),
							})
						}
					/>
				</div>
			</section>
		</Transition>
	);
};

export default Gallery;
