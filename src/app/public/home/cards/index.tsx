import { forwardRef } from 'react';
import { Link } from '@tanstack/react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowRight,
	faCube,
	faImages,
	faPrint,
} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useHomeTranslation } from '@/hooks/locales/pages/public';
import galleryPic from '@/assets/cards/gallery.png';
import customPic from '@/assets/cards/custom.png';
import printerPic from '@/assets/cards/printer.png';
import Check from './check';

interface CardProps {
	id: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(({ id }, ref) => {
	const tHome = useHomeTranslation();

	let title = '';
	const checks: string[] = [];
	let icon: IconProp = '0';
	let image: string = '';
	let link = '';

	switch (id) {
		case 'cart':
			title = tHome('card-title_cart');
			checks.push(
				tHome('card-desc-1_cart'),
				tHome('card-desc-2_cart'),
				tHome('card-desc-3_cart'),
			);
			icon = faImages;
			image = galleryPic;
			link = '/gallery';
			break;
		case 'order':
			title = tHome('card-title_order');
			checks.push(
				tHome('card-desc-1_order'),
				tHome('card-desc-2_order'),
				tHome('card-desc-3_order'),
			);
			icon = faCube;
			image = customPic;
			link = '/orders';
			break;
		case 'delivery':
			title = tHome('card-title_delivery');
			checks.push(
				tHome('card-desc-1_delivery'),
				tHome('card-desc-2_delivery'),
				tHome('card-desc-3_delivery'),
			);
			icon = faPrint;
			image = printerPic;
			link = '/shipments';
			break;
		default:
			break;
	}

	return (
		<div
			ref={ref}
			className='grid grid-cols-[repeat(auto-fit,minmax(15rem,20rem))] justify-center gap-8 group/container'
		>
			<article className='relative text-center h-[150%] bg-[hsl(170,12%,8%)] grid gap-y-4 overflow-hidden transition-all duration-500 pt-12 pb-6 px-6 border-2 border-solid border-[hsl(170,4%,60%)] hover:bg-transparent group/article shadow-md hover:shadow-lg'>
				<FontAwesomeIcon
					icon={icon}
					className='self-end transition-all duration-500 delay-100 scale-[4] group-hover/article:translate-y-[-1.5rem] group-hover/article:opacity-0'
					style={{
						marginInline: 'auto',
						filter: 'drop-shadow(0 0.5rem 1.5rem hsla(170, 12%, 8%, 0.1))',
					}}
				/>

				<div className='text-[1.2rem] flex justify-center items-end transition-all duration-500 delay-100 group-hover/article:translate-y-[-4.5rem] group-hover/article:opacity-0'>
					<h3 className='text-[1.2rem] font-normal transition-colors duration-300'>
						{title}
					</h3>
				</div>

				<img
					src={image}
					alt='image'
					className='absolute w-full h-full object-cover object-center z-[-1] transition-all duration-700 ease-in-out bg-cover scale-[1.3] left-0 top-0 group-hover/article:scale-100 opacity-90 group-hover/article:opacity-100'
					width={0}
					height={0}
				/>

				<Link
					to={link}
					className='bg-[hsl(170,12%,98%)] text-[black] flex items-center gap-x-2 justify-self-center shadow-[0_0.5rem_1.5rem_hsla(170,12%,8%,0.1)] absolute bottom-[-1.5rem] opacity-0 pointer-events-none transition-all duration-500 delay-100 px-4 py-3 group-hover/article:translate-y-[-3.75rem] group-hover/article:opacity-100 group-hover/article:pointer-events-auto group-hover/article:transition-all group-hover/article:duration-[0.5s] group-hover/article:ease-in-out group-hover/article:hover:bg-[hsl(0,0%,75%)] group/btn rounded-sm hover:rounded-lg'
				>
					{tHome('learn-more')}
					<FontAwesomeIcon
						className='text-[1.15rem] transition-transform duration-300 ease-in-out group-hover/btn:translate-x-2'
						icon={faArrowRight}
					></FontAwesomeIcon>
				</Link>
			</article>
			<div
				className='max-h-0 overflow-hidden opacity-0 bg-[hsl(222,28%,15%)] text-white text-[0.9rem] leading-[1.4] mt-[40%] px-4 py-0 rounded-[5px] border-t-black border-t border-solid group-hover/container:max-h-40 group-hover/container:opacity-100 group-hover/container:p-4 border-0 transform group-hover/container:translate-y-0 translate-y-2 shadow-none group-hover/container:shadow-md'
				style={{
					transition:
						'max-height 0.4s ease, opacity 0.4s ease, padding 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease',
				}}
			>
				<ul className='fa-ul flex flex-col gap-2.5'>
					{checks.map((c) => (
						<Check key={c} desc={c} />
					))}
				</ul>
			</div>
		</div>
	);
});

Card.displayName = 'Card';

export default Card;
