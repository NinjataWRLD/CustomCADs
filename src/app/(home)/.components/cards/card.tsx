import React, { forwardRef } from 'react';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import styles from './card.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface CardProps {
	title: string;
	icon: IconProp;
	pricing: string;
	desc1: string;
	desc2: string;
	desc3: string;
	image: StaticImageData;
	link: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
	({ title, icon, pricing, desc1, desc2, desc3, image, link }, ref) => {
		return (
			<div ref={ref} className={`${styles['card-container']}`}>
				<article className={`${styles['card-article']}`}>
					<FontAwesomeIcon
						icon={icon}
						className={styles['card-icon']}
					/>

					<div className={`${styles['card-data']}`}>
						<h3 className={`${styles['card-title']}`}>{title}</h3>
						<span className={`${styles['card-price']}`}>
							${pricing}
						</span>
					</div>

					<Image
						src={image}
						alt='image'
						className={`${styles['card-bg']}`}
						width={0}
						height={0}
					/>

					<Link href={link} className={`${styles['card-button']}`}>
						Learn More{' '}
						<FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
					</Link>
				</article>
				<div className={`${styles.description}`}>
					<ul className={`fa-ul ${styles.list}`}>
						<li>
							<span className='fa-li'>
								<i className='fa-solid fa-check'></i>
							</span>
							{desc1}
						</li>
						<li>
							<span className='fa-li'>
								<i className='fa-solid fa-check'></i>
							</span>
							{desc2}
						</li>
						<li>
							<span className='fa-li'>
								<i className='fa-solid fa-check'></i>
							</span>
							{desc3}
						</li>
					</ul>
				</div>
			</div>
		);
	},
);

Card.displayName = 'Card';

export default Card;
