import { useState } from 'react';
import { Route } from '@/routes/_public/account';
import { useMyAccountTranslation } from '@/hooks/locales/pages/public';
import Transition from '@/app/components/transition';
import * as dateTime from '@/utils/date-time';
import AboutMe from './about-me';
import Security from './security';
import MyData from './my-data';
import styles from './styles.module.css';

const Account = () => {
	const { account } = Route.useLoaderData();
	const tMyAccount = useMyAccountTranslation();

	const [tab, setTab] = useState<'about-me' | 'security' | 'my-data'>(
		'about-me',
	);

	const renderSection = () => {
		switch (tab) {
			case 'about-me':
				return (
					<AboutMe
						username={account.username}
						role={account.role}
						createdAt={dateTime.format({
							date: account.createdAt,
							dateOnly: true,
						})}
					/>
				);
			case 'security':
				return <Security email={account.email} />;
			case 'my-data':
				return <MyData />;
			default:
				return null;
		}
	};

	return (
		<Transition>
			<div className={`${styles.container}`}>
				<h1>{tMyAccount('title')}</h1>
				<div className={`${styles.box}`}>
					<div className={`${styles.choices}`}>
						<div
							className={`${styles.choice} ${tab === 'about-me' ? styles.active : ''}`}
							onClick={() => setTab('about-me')}
						>
							<span>{tMyAccount('about-me')}</span>
						</div>
						<div
							className={`${styles.choice} ${tab === 'security' ? styles.active : ''}`}
							onClick={() => setTab('security')}
						>
							<span>{tMyAccount('security')}</span>
						</div>
						<div
							className={`${styles.choice} ${tab === 'my-data' ? styles.active : ''}`}
							onClick={() => setTab('my-data')}
						>
							<span>{tMyAccount('my-data')}</span>
						</div>
					</div>
					<div className={`${styles['box-container']}`}>
						{renderSection()}
					</div>
				</div>
			</div>
		</Transition>
	);
};

export default Account;
