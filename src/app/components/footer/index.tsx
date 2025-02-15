import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFacebook,
	faInstagram,
	faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useFooterTranslation } from '@/hooks/locales/components/layout';
import styles from './styles.module.css';

const Footer = () => {
	const tFooter = useFooterTranslation();

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
					<h1>{tFooter('title')}</h1>
					<p>{tFooter('description')}</p>
					<p>
						<Link to='/privacy-policy'>{tFooter('link-1')}</Link>
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
								{tFooter('icon-1')}
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
								{tFooter('icon-2')}
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
								{tFooter('icon-3')}
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
								{tFooter('icon-4')}
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
