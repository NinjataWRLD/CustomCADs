'use client';
import React, { useEffect, useRef } from 'react';
import Info from './.components/info/info';
import Benefits from './.components/benefits/benefits';
import Popular from './.components/popular/popular';
import Card from './.components/cards/card';
import Contacts from './.components/contacts/contacts';
import Figures from './.components/figures/figures';
import FiguresAnimation from './.components/figures/animation';
import styles from './styles.module.css';
import galleryPic from '@/assets/cards/gallery.png';
import customPic from '@/assets/cards/custom.png';
import printerPic from '@/assets/cards/printer.png';
import { faCube, faPrint } from '@fortawesome/free-solid-svg-icons';
import { faImages } from '@fortawesome/free-regular-svg-icons';

const Home: React.FC = () => {
	const sectionsRef = useRef<(HTMLElement | null)[]>([]);
	const boxRef = useRef<HTMLDivElement | null>(null);

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
				<h1>Most Popular 3D Models</h1>
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
				<h1>3D Models Prices</h1>
				<div className={styles.cards}>
					<Card
						ref={boxRef}
						title='Order from Gallery (Digital)'
						icon={faImages}
						pricing='15'
						desc1='Ready-made designs'
						desc2='Fast printing and delivery'
						desc3='Affordable and convenient'
						image={galleryPic}
						link='/gallery'
					/>
					<Card
						ref={boxRef}
						title='Custom 3D Model (Digital)'
						icon={faCube}
						pricing='25'
						desc1='Tailored design to your specifications'
						desc2='Delivered as a digital file'
						desc3='Perfect for further customization or personal use'
						image={customPic}
						link='/custom-models'
					/>
					<Card
						ref={boxRef}
						title='3D Model & Printed'
						icon={faPrint}
						pricing='35'
						desc1='Personalized 3D design'
						desc2='Physical product delivered to your door'
						desc3='High-quality print with attention to detail'
						image={printerPic}
						link='/gallery'
					/>
				</div>
			</section>

			<hr />

			<section
				ref={(el) => {
					sectionsRef.current[4] = el;
				}}
				id='section5'
				className={styles.contacts}
			>
				<Contacts />
			</section>
		</div>
	);
};

export default Home;
