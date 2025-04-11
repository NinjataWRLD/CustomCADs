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
import styles from './styles.module.css';

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
		<div ref={ref} className={`${styles['card-container']}`}>
			<article className={`${styles['card-article']}`}>
				<FontAwesomeIcon icon={icon} className={styles['card-icon']} />

				<div className={`${styles['card-data']}`}>
					<h3 className={`${styles['card-title']}`}>{title}</h3>
				</div>

				<img
					src={image}
					alt='image'
					className={`${styles['card-bg']}`}
					width={0}
					height={0}
				/>

				<Link to={link} className={`${styles['card-button']}`}>
					{tHome('learn-more')}
					<FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
				</Link>
			</article>
			<div className={`${styles.description}`}>
				<ul className={`fa-ul ${styles.list}`}>
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
