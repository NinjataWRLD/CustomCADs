import { useTranslation } from 'react-i18next';
import { useHeaderTranslation } from '@/hooks/locales/components/layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import gbFlag from '@/assets/images/flags/gb.svg';
import bgFlag from '@/assets/images/flags/bg.svg';
import styles from './styles.module.css';
import { useEffect, useState, useRef } from 'react';

type LanguageMenuProps = {
	closeMenu: () => void;
	isVisible: boolean;
	onExited: () => void;
};

const LanguageMenu = ({
	closeMenu,
	onExited,
	isVisible = true,
}: LanguageMenuProps) => {
	const { i18n } = useTranslation();
	const tHeader = useHeaderTranslation();
	const [animationState, setAnimationState] = useState<
		'entering' | 'visible' | 'exiting'
	>(isVisible ? 'entering' : 'exiting');
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const handleClose = () => {
		setAnimationState('exiting');
		closeMenu();
	};

	const handleLanguageChange = (lang: string) => {
		if (i18n.language !== lang) {
			i18n.changeLanguage(lang);
		}
		handleClose();
	};

	useEffect(() => {
		if (isVisible && animationState === 'entering') {
			timeoutRef.current = setTimeout(() => {
				setAnimationState('visible');
			}, 50);
		}

		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, [isVisible, animationState]);

	useEffect(() => {
		if (animationState === 'exiting') {
			timeoutRef.current = setTimeout(() => {
				onExited();
			}, 300);
		}
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, [animationState]);

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') handleClose();
		};

		document.addEventListener('keydown', handleEscape);
		return () => document.removeEventListener('keydown', handleEscape);
	}, []);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			const target = e.target as Node;
			const menuElement = document.querySelector(
				`.${styles['language-menu']}`,
			);
			const iconWrapper = document.querySelector(
				`.${styles['icon-wrapper']}`,
			);

			if (
				menuElement &&
				!menuElement.contains(target) &&
				iconWrapper &&
				!iconWrapper.contains(target)
			) {
				handleClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const getAnimationClass = () => {
		switch (animationState) {
			case 'entering':
				return styles.entering;
			case 'visible':
				return styles.visible;
			case 'exiting':
				return styles.exiting;
			default:
				return '';
		}
	};

	return (
		<aside className={`${styles['language-menu']} ${getAnimationClass()}`}>
			<div
				className={styles.close}
				onClick={handleClose}
				aria-label='Close menu'
			>
				<FontAwesomeIcon icon={faTimes} />
			</div>
			<h3>{tHeader('choose-language')}</h3>
			<section className={styles['language-container']}>
				<div
					onClick={() => handleLanguageChange('en')}
					className={i18n.language === 'en' ? styles.active : ''}
				>
					<img
						src={gbFlag}
						width={50}
						height={50}
						alt='English flag'
					/>
					<span>{tHeader('english')}</span>
					{i18n.language === 'en' && (
						<FontAwesomeIcon
							icon={faCheck}
							className={styles.checkmark}
						/>
					)}
				</div>
				<hr />
				<div
					onClick={() => handleLanguageChange('bg')}
					className={i18n.language === 'bg' ? styles.active : ''}
				>
					<img
						src={bgFlag}
						width={50}
						height={50}
						alt='Bulgarian flag'
					/>
					<span>{tHeader('bulgarian')}</span>
					{i18n.language === 'bg' && (
						<FontAwesomeIcon
							icon={faCheck}
							className={styles.checkmark}
						/>
					)}
				</div>
			</section>
		</aside>
	);
};

export default LanguageMenu;
