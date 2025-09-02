import { useEffect, useState } from 'react';
import { Route } from '@/routes/_public/account';
import { useMyAccountTranslation } from '@/hooks/locales/pages/public';
import Transition from '@/app/components/transition';
import * as dateTime from '@/utils/date-time';
import Tab from './tab';
import AboutMe from './about-me';
import Security from './security';
import MyData from './my-data';
import Settings from './settings';

export const tabs = ['about-me', 'settings', 'security', 'my-data'] as const;
type Tab = (typeof tabs)[number];

const Account = () => {
	const { tab: tabParam } = Route.useSearch();
	const navigate = Route.useNavigate();

	const { account } = Route.useLoaderData();
	const tMyAccount = useMyAccountTranslation();

	const [tab, setTab] = useState<Tab>(tabParam ?? 'about-me');
	useEffect(() => {
		navigate({ to: '.', search: { tab: tab } });
	}, [tab]);

	const renderSection = () => {
		switch (tab) {
			case 'about-me':
				return (
					<AboutMe
						username={account.username}
						firstName={account.firstName}
						lastName={account.lastName}
						role={account.role}
						createdAt={dateTime.format({
							date: account.createdAt,
							dateOnly: true,
						})}
					/>
				);
			case 'settings':
				return (
					<Settings
						trackViewedProducts={account.trackViewedProducts}
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
			<div className='relative h-screen flex justify-center items-center flex-col text-[white]'>
				<h1 className='text-[2rem] title-text-shadow'>
					{tMyAccount('title')}
				</h1>
				<div className='relative w-4/5 h-[70%] flex rounded-[20px]'>
					<div className='w-[25%] h-full bg-transparent text-[1.3rem] flex flex-col gap-[30px] border-0 border-r-[3px] border-r-[#9000ff] border-solid'>
						<Tab
							text={tMyAccount('about-me')}
							isActive={tab === 'about-me'}
							onClick={() => setTab('about-me')}
						/>
						<Tab
							text={tMyAccount('settings')}
							isActive={tab === 'settings'}
							onClick={() => setTab('settings')}
						/>
						<Tab
							text={tMyAccount('security')}
							isActive={tab === 'security'}
							onClick={() => setTab('security')}
						/>
						<Tab
							text={tMyAccount('my-data')}
							isActive={tab === 'my-data'}
							onClick={() => setTab('my-data')}
						/>
					</div>
					<div className='relative w-4/5 h-[90%] flex flex-col bg-[hsl(228,21%,14%)] p-[30px] rounded-[20px];'>
						{renderSection()}
					</div>
				</div>
			</div>
		</Transition>
	);
};

export default Account;
