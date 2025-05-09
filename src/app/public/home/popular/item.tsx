import { useNavigate } from '@tanstack/react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useGenerateBlobUrl } from '@/hooks/useGenerateBlobUrl';
import { useDownloadProductImage } from '@/hooks/queries/products/gallery';

interface ItemProps {
	product: {
		id: string;
		name: string;
		views: number;
		category: string;
	};
}

const Item = ({ product }: ItemProps) => {
	const navigate = useNavigate();

	const { data: image } = useDownloadProductImage({ id: product.id });
	const blobUrl = useGenerateBlobUrl(image);

	const handleDetailsClick = () => {
		navigate({ to: '/gallery/$id', params: { id: product.id } });
	};

	return (
		<div
			className={`relative w-6/12 h-[70%] flex justify-center items-center mb-20 rounded-[15px] before:content-[''] before:absolute before:bg-[linear-gradient(315deg, #7b03f459, #ff00a24f)] before:w-full before:h-full before:rounded-[15px] before:left-0 before:top-0 after:content-[''] after:absolute after:w-full after:h-full after:bg-[linear-gradient(315deg, #7b03f459, #ff00a24f)] after:blur-[30px] after:rounded-[15px] after:left-0 after:top-0 group/model`}
			style={{ background: 'rgba(109, 0, 255, 0.482)' }}
		>
			<b
				className='absolute z-[2] rounded-[15px] inset-1.5'
				style={{ background: 'rgba(0, 0, 0, 0.6)' }}
			></b>
			{blobUrl && (
				<img
					onClick={handleDetailsClick}
					src={blobUrl}
					alt='Product Image'
					className='absolute w-4/5 h-4/5 origin-[center_center] opacity-[0.45] z-[3] transition-all duration-[0.5s] ease-[ease] blur-[1px] contrast-100 cursor-pointer rounded-[20px] object-cover scale-100 group-hover/model:opacity-90 group-hover/model:scale-[0.7] group-hover/model:-translate-y-15 group-hover/model:shadow-[0_15px_30px_rgba(0,0,0,0.5),0_0_10px_rgba(255,255,255,0.3)] group-hover/model:blur-none group-hover/model:contrast-[1.2] group-hover/model:rounded-[50%] group-hover/model:border-[3px] group-hover/model:border-solid group-hover/model:border-[rgba(255,255,255,0.7)]'
				/>
			)}
			<div className='absolute z-[3] flex flex-col items-center transition-transform duration-600 ease-in-out scale-0 bottom-[10%] group-hover/model:scale-100'>
				<p
					onClick={handleDetailsClick}
					className='relative text-white font-medium leading-[1em] text-[1.05em] tracking-widest uppercase text-center cursor-pointer'
				>
					{product.name}
					<br />
					<span className='font-light text-[0.7em]'>
						{product.category}
					</span>
				</p>
				<div className='text-center flex justify-center items-center gap-5'>
					<div className='flex items-center gap-[5px] text-base group/views'>
						<FontAwesomeIcon
							className='text-[1.2rem] text-[#afafaf] transition-[color] duration-[0.2s] ease-[ease] group-hover/views:text-[#c736da]'
							icon={faEye}
						></FontAwesomeIcon>
						<div className='text-base text-white font-medium'>
							{product.views}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Item;
