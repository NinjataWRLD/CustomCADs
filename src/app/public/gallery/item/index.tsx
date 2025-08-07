import { Link } from '@tanstack/react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Response as Product } from '@/api/catalog/products/gallery/all';
import { useDownloadProductImage } from '@/hooks/queries/products/gallery';
import Loader from '@/app/components/state/loading';

interface ItemProps {
	product: Product;
}

const Item = ({ product }: ItemProps) => {
	const { data: image, isLoading } = useDownloadProductImage({
		id: product.id,
	});

	if (isLoading) {
		return <Loader />;
	}

	return (
		<Link
			to='/gallery/$id'
			params={{ id: product.id }}
			className="relative w-[300px] h-[300px] flex justify-center items-center
         bg-[rgba(89,0,255,0.482)]
         before:content-[''] before:absolute before:w-full before:h-full before:left-0 before:top-0
         before:bg-[linear-gradient(315deg,hsla(278,73%,71%,0.6),hsla(320,70%,22%,0.6))]
         after:content-[''] after:absolute after:w-full after:h-full after:left-0 after:top-0 after:blur-[30px]
         after:bg-[linear-gradient(315deg,hsla(278,73%,71%,0.6),hsla(320,70%,22%,0.6))] group"
		>
			<b className='absolute z-[2] inset-[5px] bg-[rgba(0,0,0,0.6)]'></b>
			<img
				className='w-full h-full object-cover scale-[0.8] absolute origin-[center_center] opacity-[0.45] blur-[1px] contrast-100 z-[3] cursor-pointer transition-all duration-[0.5s] ease-[ease] rounded-[5px] group-hover:translate-y-[-15%] group-hover:opacity-90 group-hover:shadow-[0_15px_30px_rgba(0,0,0,0.5),0_0_10px_rgba(255,255,255,0.3)] group-hover:blur-none group-hover:contrast-[1.2] group-hover:rounded-[50%] group-hover:border-[3px] group-hover:border-solid group-hover:border-[rgba(255,255,255,0.7)] group-hover:scale-[0.55]'
				src={image?.presignedUrl}
				alt='Product Image'
				loading='lazy'
			/>
			<div className='absolute flex flex-col items-center z-[3] transition-[0.5s] scale-0 bottom-0 group-hover:scale-100 group-hover:bottom-2.5'>
				<p className='relative text-white font-medium leading-[1em] text-[1.05em] tracking-widest uppercase text-center cursor-pointer'>
					{product.name}
					<br />
					<span className='font-light text-[0.7em]'>
						{product.category}
					</span>
				</p>
				<div className='text-center flex justify-center items-center gap-5 mb-2.5'>
					<div className='flex items-center gap-[5px] text-base group/views'>
						<FontAwesomeIcon
							className='text-[1.2rem] text-[#afafaf] transition-[color] duration-[0.2s] ease-[ease] group-hover/views:text-[#c736da]'
							icon={faEye}
						/>
						<div className='text-base text-white font-medium'>
							{product.views}
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default Item;
