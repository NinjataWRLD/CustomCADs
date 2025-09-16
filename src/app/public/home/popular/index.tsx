import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Response as Product } from '@/api/catalog/products/gallery/all';
import { useHomeTranslation } from '@/hooks/locales/pages/public';
import CustomLink from '@/app/components/link';
import { useCarousel } from './useCarousel';
import Item from './item';

type PopularProductsProps = { products: Product[] };
const PopularProducts = ({ products }: PopularProductsProps) => {
	const tHome = useHomeTranslation();
	const { index, handleNext, handlePrev, findIndex } = useCarousel(products);

	return (
		<>
			<div className='relative w-3/5 flex justify-center items-start gap-[50px] h-[70%] overflow-hidden shadow-[0_0_10px_rgba(75,0,130,0.8),0_0_20px_rgba(138,43,226,0.6),0_0_30px_rgba(147,112,219,0.4)] p-5 rounded-[20px] border-[5px] border-solid border-transparent'>
				<div
					className='absolute text-center flex items-center justify-center text-[1.8rem] w-[5%] h-[10%] cursor-pointer z-[90] rounded-[50%] top-2/4 left-[2%]'
					onClick={handlePrev}
				>
					<FontAwesomeIcon icon={faAngleLeft} />
				</div>
				<div
					className='relative h-full w-[300%] flex translate-x-[calc(-100%_*_var(--current-index))] transition-transform duration-[0.8s] ease-[cubic-bezier(0.25,1,0.5,1)]'
					style={
						{
							'--current-index': index.current,
						} as React.CSSProperties
					}
				>
					{products.map((product) => (
						<div
							key={product.id}
							className={`flex-[0_0_100%] flex w-full justify-center items-center opacity-0 scale-90 ${findIndex(product.id) === index.current && 'w-full opacity-100 scale-100'}`}
							style={{
								transition:
									'opacity 0.8s ease-in-out, transform 0.8s ease-in-out',
							}}
						>
							<Item product={product} />
						</div>
					))}
				</div>
				<div
					className='absolute text-center flex items-center justify-center text-[1.8rem] w-[5%] h-[10%] cursor-pointer z-[90] rounded-[50%] top-2/4 right-[2%]'
					onClick={handleNext}
				>
					<FontAwesomeIcon icon={faAngleRight} />
				</div>
				<div className='absolute -translate-x-2/4 -translate-y-2/4 left-2/4 bottom-[5%]'>
					<CustomLink
						to='/gallery'
						text={tHome('popular-gallery-btn')}
					/>
				</div>
			</div>
		</>
	);
};

export default PopularProducts;
