import { Link } from '@tanstack/react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFacebook,
	faInstagram,
	faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useFooterTranslation } from '@/hooks/locales/components/layout';

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
		<>
			<div className="relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-[2px] before:bg-gradient-to-r before:from-[#6a11cb] before:to-[hsl(218,81%,21%)]"></div>
			<footer className='bg-black text-white py-8 px-4'>
				<div className='flex flex-col md:flex-row items-center justify-around flex-shrink text-center md:text-left'>
					<div className='text-[1.1rem] sm:text-base'>
						<h1>
							{`\u00A9 ${2024}-${new Date().getFullYear()} CustomCADs`}
						</h1>
						<p>{tFooter('description')}</p>
						<p>
							<Link
								to='/privacy-policy'
								className='text-white/70 hover:text-white transition-colors duration-400'
							>
								{tFooter('link-1')}
							</Link>
						</p>
					</div>

					<div>
						<div className='grid place-items-center gap-6 sm:grid-cols-1 md:grid-cols-2 mt-8 md:mt-0'>
							{[
								{
									id: '1',
									icon: faEnvelope,
									href: 'https://mail.google.com/mail/?view=cm&fs=1&to=customcads2023@gmail.com',
									label: tFooter('icon-1'),
								},
								{
									id: '2',
									icon: faInstagram,
									href: 'https://www.instagram.com/custom_cads/',
									label: tFooter('icon-2'),
								},
								{
									id: '3',
									icon: faFacebook,
									href: 'https://www.facebook.com/profile.php?id=61569972183042',
									label: tFooter('icon-3'),
								},
								{
									id: '4',
									icon: faLinkedin,
									href: 'https://www.linkedin.com/company/customcads/',
									label: tFooter('icon-4'),
								},
							].map(({ id, icon, href, label }) => (
								<div
									key={id}
									className='flex flex-col items-center justify-center gap-2.5 cursor-pointer group'
								>
									<div onClick={getLink}>
										<FontAwesomeIcon
											icon={icon}
											className='text-transparent stroke-[15px] stroke-[#b16dff] text-[3.2rem] transition-transform duration-400 ease-linear group-hover:stroke-[rgba(115,52,187,0.721)] group-hover:scale-105'
										/>
									</div>
									<a
										href={href}
										target='_blank'
										rel='noopener noreferrer'
										className='relative text-white group'
									>
										<span className="after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[1px] after:bg-purple-700 after:transition-transform after:duration-300 after:ease-in-out after:scale-x-0 after:origin-right group-hover:after:scale-x-100 group-hover:after:origin-left">
											{label}
										</span>
									</a>
								</div>
							))}
						</div>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
