import React, { useEffect, useRef } from 'react';
import { useHomeTranslation } from '@/hooks/locales/pages/public';
import Info from './.components/info/info';
import Benefits from './.components/benefits/benefits';
import Popular from './.components/popular/popular';
import Card from './.components/cards/card';
import Figures from './.components/figures/figures';
import FiguresAnimation from './.components/figures/animation';
import styles from './styles.module.css';

const Home: React.FC = () => {
	const sectionsRef = useRef<(HTMLElement | null)[]>([]);
	const boxRef = useRef<HTMLDivElement | null>(null);
	const tHome = useHomeTranslation();

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
				<Info scrollTargetId='section2' />
				<div className={styles.cover}></div>
				<Figures />
				<FiguresAnimation />
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

			<section
				ref={(el) => {
					sectionsRef.current[2] = el;
				}}
				id='section3'
				className={`${styles.models} ${styles.section}`}
			>
				<h1>{tHome('title_popular')}</h1>
				<Popular />
			</section>

			<hr />

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

			{/* <hr />

			<section
				ref={(el) => {
					sectionsRef.current[4] = el;
				}}
				id='section5'
				className={styles.contacts}
			>
				<Contacts />
			</section> */}
		</div>
	);
};

export default Home;
