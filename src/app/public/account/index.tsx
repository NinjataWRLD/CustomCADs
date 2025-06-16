import { useState } from 'react';
import { Route } from '@/routes/_public/account';
import { useMyAccountTranslation } from '@/hooks/locales/pages/public';
import Transition from '@/app/components/transition';
import * as dateTime from '@/utils/date-time';
import AboutMe from './about-me';
import Security from './security';
import MyData from './my-data';

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
			<div className='relative h-screen flex justify-center items-center flex-col text-[white]'>
				<h1 className='text-[2rem] title-text-shadow'>
					{tMyAccount('title')}
				</h1>
				<div className='relative w-4/5 h-[70%] flex rounded-[20px]'>
					<div className='w-[25%] h-full bg-transparent text-[1.3rem] flex flex-col gap-[30px] border-0 border-r-[3px] border-r-[#9000ff] border-solid'>
						<div
							className={`w-full h-[15%] cursor-pointer flex justify-center items-center transition-all duration-300 ease-linear bg-[rgba(142,110,205,0.31)] hover:bg-[rgba(98,42,161,0.522)] hover:w-[90%] hover:ml-[10%]`}
							onClick={() => setTab('about-me')}
							style={{
								clipPath:
									'polygon(0 0, 100% 0, 100% 50%, 100% 100%, 0 100%, 24% 54%)',
							}}
						>
							<span
								className={`transition-[font-weight] duration-[0.3s] ease-linear ml-[30px] ${tab === 'about-me' ? 'font-bold' : ''}`}
							>
								{tMyAccount('about-me')}
							</span>
						</div>
						<div
							className={`w-full h-[15%] cursor-pointer flex justify-center items-center transition-all duration-300 ease-linear bg-[rgba(142,110,205,0.31)] hover:bg-[rgba(98,42,161,0.522)] hover:w-[90%] hover:ml-[10%]`}
							onClick={() => setTab('security')}
							style={{
								clipPath:
									'polygon(0 0, 100% 0, 100% 50%, 100% 100%, 0 100%, 24% 54%)',
							}}
						>
							<span
								className={`transition-[font-weight] duration-[0.3s] ease-linear ml-[30px] ${tab === 'security' ? 'font-bold' : ''}`}
							>
								{tMyAccount('security')}
							</span>
						</div>
						<div
							className={`w-full h-[15%] cursor-pointer flex justify-center items-center transition-all duration-300 ease-linear bg-[rgba(142,110,205,0.31)] hover:bg-[rgba(98,42,161,0.522)] hover:w-[90%] hover:ml-[10%]`}
							onClick={() => setTab('my-data')}
							style={{
								clipPath:
									'polygon(0 0, 100% 0, 100% 50%, 100% 100%, 0 100%, 24% 54%)',
							}}
						>
							<span
								className={`transition-[font-weight] duration-[0.3s] ease-linear ml-[30px] ${tab === 'my-data' ? 'font-bold' : ''}`}
							>
								{tMyAccount('my-data')}
							</span>
						</div>
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
