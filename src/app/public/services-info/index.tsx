import React, { useEffect } from 'react';
import { useServicesTranslation } from '@/hooks/locales/pages/public';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faShoppingCart,
	faPencilRuler,
	faShippingFast,
	faUpload,
	faDownload,
	faHandshake,
} from '@fortawesome/free-solid-svg-icons';
import Transition from '@/app/components/transition';
import Button from '@/app/components/button';
import Service from './service';
import styles from './styles.module.css';

const ServicesInfo: React.FC = () => {
	const tServices = useServicesTranslation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<Transition>
			<div className={`${styles.container}`}>
				<h1>{tServices('title')}</h1>
				<h2>{tServices('subTitle')}</h2>
				<div className={`${styles['services-container']}`}>
					<Service
						title={tServices('serviceTitle1')}
						details={tServices('serviceDetails1')}
						role={tServices('serviceRoles1')}
						icon={
							<FontAwesomeIcon
								className={styles.icon}
								icon={faShoppingCart}
							/>
						}
						button={
							<Button
								type='button'
								text={tServices('serviceButtonText1')}
							/>
						}
					/>
					<Service
						title={tServices('serviceTitle2')}
						details={tServices('serviceDetails2')}
						role={tServices('serviceRoles2')}
						icon={
							<FontAwesomeIcon
								className={styles.icon}
								icon={faPencilRuler}
							/>
						}
						button={
							<Button
								type='button'
								text={tServices('serviceButtonText2')}
							/>
						}
					/>
					<Service
						title={tServices('serviceTitle3')}
						details={tServices('serviceDetails3')}
						role={tServices('serviceRoles3')}
						icon={
							<FontAwesomeIcon
								className={styles.icon}
								icon={faShippingFast}
							/>
						}
						button={
							<Button
								type='button'
								text={tServices('serviceButtonText3')}
							/>
						}
					/>
					<Service
						title={tServices('serviceTitle4')}
						details={tServices('serviceDetails4')}
						role={tServices('serviceRoles4')}
						icon={
							<FontAwesomeIcon
								className={styles.icon}
								icon={faUpload}
							/>
						}
						button={
							<Button
								type='button'
								text={tServices('serviceButtonText4')}
							/>
						}
					/>
					<Service
						title={tServices('serviceTitle5')}
						details={tServices('serviceDetails5')}
						role={tServices('serviceRoles5')}
						icon={
							<FontAwesomeIcon
								className={styles.icon}
								icon={faDownload}
							/>
						}
						button={
							<Button
								type='button'
								text={tServices('serviceButtonText5')}
							/>
						}
					/>
					<Service
						title={tServices('serviceTitle6')}
						details={tServices('serviceDetails6')}
						role={tServices('serviceRoles6')}
						icon={
							<FontAwesomeIcon
								className={styles.icon}
								icon={faHandshake}
							/>
						}
						button={
							<Button
								type='button'
								text={tServices('serviceButtonText6')}
							/>
						}
					/>
				</div>
			</div>
		</Transition>
	);
};

export default ServicesInfo;
