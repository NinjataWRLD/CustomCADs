import React from 'react';
import Link from 'next/link';
import styles from './footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFacebook,
	faInstagram,
	faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer: React.FC = () => {
	const getLink = (
		event: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>,
	) => {
		const linkElement = event.currentTarget.nextElementSibling;

		if (linkElement && linkElement.tagName === 'A') {
			const url = (linkElement as HTMLAnchorElement).href;
			window.open(url, '_blank');
		}
	};

	return (
		<footer className={`${styles.footer}`}>
			<div className={`${styles['gradient-border-top']}`}></div>
			<div className={`${styles.content}`}>
				<div className={`${styles.info}`}>
					<h1>&copy; 2024 CustomCADs</h1>
					<p>
						Your go-to platform for custom 3D designs, pre-made
						models, and designer connections.
					</p>
					<p>
						<Link href='/privacy-policy'>Privacy Policy</Link>
					</p>
				</div>
				<div className={`${styles.links}`}>
					<div className={`${styles.contacts}`}>
						<div className={`${styles.icon}`}>
							<div id='1' onClick={getLink}>
								<FontAwesomeIcon
									icon={faEnvelope}
									className={styles.iconfr}
								/>
							</div>
							<a
								href='https://mail.google.com/mail/?view=cm&fs=1&to=customcads2023@gmail.com'
								target='_blank'
							>
								Email
							</a>
						</div>

						<div className={`${styles.icon}`}>
							<div id='2' onClick={getLink}>
								<FontAwesomeIcon
									icon={faInstagram}
									className={styles.iconfr}
								/>
							</div>
							<a
								href='https://www.instagram.com/custom_cads/'
								target='_blank'
							>
								Instagram
							</a>
						</div>

						<div className={`${styles.icon}`}>
							<div id='3' onClick={getLink}>
								<FontAwesomeIcon
									icon={faFacebook}
									className={styles.iconfr}
								/>
							</div>
							<a
								href='https://www.facebook.com/profile.php?id=61569972183042'
								target='_blank'
							>
								Facebook
							</a>
						</div>

						<div className={`${styles.icon}`}>
							<div id='4' onClick={getLink}>
								<FontAwesomeIcon
									icon={faLinkedin}
									className={styles.iconfr}
								/>
							</div>
							<a
								href='https://www.linkedin.com/company/customcads/'
								target='_blank'
							>
								LinkedIn
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
