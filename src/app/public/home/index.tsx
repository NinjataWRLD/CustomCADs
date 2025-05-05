import { useEffect, useRef } from 'react';
import { Route } from '@/routes/_public';
import { useHomeTranslation } from '@/hooks/locales/pages/public';
import Info from './info';
import Benefits from './benefits';
import PopularProducts from './popular';
import Card from './cards';
import Figures from './figures';
import FiguresAnimation from './figures/animation';
import Loader from '@/app/components/state/loading';
import styles from './styles.module.css';

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
						entry.target.classList.add(styles.visible);
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
						entry.target.classList.add(styles.visible);
					} else {
						entry.target.classList.remove(styles.visible);
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
		<div className={styles.home}>
			<section
				ref={(el) => {
					sectionsRef.current[0] = el;
				}}
				id='section1'
				className={`${styles.main} ${styles.section}`}
			>
				<Info />
				<div className={styles.cover}></div>
				<Figures />
				<FiguresAnimation />
				<Loader></Loader>
			</section>

			<section
				ref={(el) => {
					sectionsRef.current[1] = el;
				}}
				id='section2'
				className={`${styles.advantages} ${styles.section}`}
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
						className={`${styles.models} ${styles.section}`}
					>
						<h1>{tHome('title_popular')}</h1>
						<PopularProducts
							total={products.count}
							products={products.items}
						/>
					</section>

					<hr />
				</>
			)}

			<section
				ref={(el) => {
					sectionsRef.current[3] = el;
				}}
				id='section4'
				className={`${styles.payments} ${styles.section}`}
			>
				<h1>{tHome('title_offer')}:</h1>
				<div className={styles.cards}>
					<Card id='cart' ref={boxRef} />
					<Card id='order' ref={boxRef} />
					<Card id='delivery' ref={boxRef} />
				</div>
			</section>
		</div>
	);
};

export default Home;
