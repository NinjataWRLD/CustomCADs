import { useEffect, useRef } from 'react';
import { Route } from '@/routes/_public';
import { useHomeTranslation } from '@/hooks/locales/pages/public';
import Info from './info';
import Benefits from './benefits';
import PopularProducts from './popular';
import Card from './cards';
import Figures from './figures';
import FiguresAnimation from './figures/animation';

const HIDDEN_SECTION = 'opacity-0 translate-y-5';
const VISIBLE_SECTION = 'opacity-100 translate-y-0';
const HIDDEN_BOX = 'opacity-0 translate-x-5';
const VISIBLE_BOX = 'opacity-100 translate-x-0';
const TRANSITION = 'transition-all duration-600 ease-out';

const Home = () => {
	const sectionsRef = useRef<(HTMLElement | null)[]>([]);
	const boxRef = useRef<HTMLDivElement | null>(null);

	const tHome = useHomeTranslation();
	const { products } = Route.useLoaderData();

	useEffect(() => {
		const sectionObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.remove(
							...HIDDEN_SECTION.split(' '),
						);
						entry.target.classList.add(
							...VISIBLE_SECTION.split(' '),
						);
					}
				});
			},
			{ threshold: 0.1 },
		);

		sectionsRef.current.forEach((section) => {
			if (section) {
				sectionObserver.observe(section);
			}
		});

		const boxObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.remove(...HIDDEN_BOX.split(' '));
						entry.target.classList.add(...VISIBLE_BOX.split(' '));
					} else {
						entry.target.classList.remove(
							...VISIBLE_BOX.split(' '),
						);
						entry.target.classList.add(...HIDDEN_BOX.split(' '));
					}
				});
			},
			{ threshold: 0.1 },
		);

		if (boxRef.current) {
			boxObserver.observe(boxRef.current);
		}

		return () => {
			sectionObserver.disconnect();
			boxObserver.disconnect();
		};
	}, []);

	return (
		<div className='relative text-black'>
			<section
				ref={(el) => {
					sectionsRef.current[0] = el;
				}}
				id='section1'
				className={`relative h-screen flex justify-center flex-col home-gradient ${HIDDEN_SECTION} ${TRANSITION} text-white`}
			>
				<Info />
				<Figures />
				<FiguresAnimation />
				<div className='absolute top-0 left-0 w-full h-full cover-gradient [clip-path:polygon(0_1%,100%_0,100%_40%,0_91%)]'></div>
			</section>

			<section
				ref={(el) => {
					sectionsRef.current[1] = el;
				}}
				id='section2'
				className={`${HIDDEN_SECTION} ${TRANSITION} text-white`}
			>
				<Benefits />
			</section>

			<hr />

			{products?.count && (
				<>
					<section
						ref={(el) => {
							sectionsRef.current[2] = el;
						}}
						id='section3'
						className={`h-[90dvh] flex flex-col justify-center items-center ${HIDDEN_SECTION} ${TRANSITION} text-white`}
					>
						<h1 className='text-center text-4xl text-white title-text-shadow mb-[4%]'>
							{tHome('title_popular')}
						</h1>
						<PopularProducts products={products.items} />
					</section>

					<hr />
				</>
			)}

			<section
				ref={(el) => {
					sectionsRef.current[3] = el;
				}}
				id='section4'
				className={`flex flex-col ${HIDDEN_SECTION} ${TRANSITION} text-white`}
			>
				<h1 className='text-center text-4xl text-white title-text-shadow'>
					{tHome('title_offer')}:
				</h1>
				<div className='py-12 px-12 pb-40 flex justify-center items-center gap-20'>
					<Card id='cart' ref={boxRef} />
					<Card id='order' ref={boxRef} />
					<Card id='delivery' ref={boxRef} />
				</div>
			</section>
		</div>
	);
};

export default Home;
