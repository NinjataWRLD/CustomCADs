import { useMyAccountTranslation } from '@/hooks/locales/pages/public';

interface AboutMeProps {
	username: string;
	firstName?: string;
	lastName?: string;
	role: string;
	createdAt: string;
}
const AboutMe = ({
	role,
	username,
	firstName,
	lastName,
	createdAt,
}: AboutMeProps) => {
	const tMyAccount = useMyAccountTranslation();

	return (
		<>
			<div className='relative flex flex-col gap-5 justify-center ml-5'>
				<div className='flex gap-5'>
					<h2>{tMyAccount('username')}</h2>
					<p className='flex justify-center items-center font-bold text-[1.4rem] ml-5 title-text-shadow'>
						{username}
					</p>
				</div>
				<div className='flex gap-5'>
					<h2>{tMyAccount('first-name')}</h2>
					<p className='flex justify-center items-center font-bold text-[1.4rem] ml-5 title-text-shadow'>
						{firstName}
					</p>
				</div>
				<div className='flex gap-5'>
					<h2>{tMyAccount('last-name')}</h2>
					<p className='flex justify-center items-center font-bold text-[1.4rem] ml-5 title-text-shadow'>
						{lastName}
					</p>
				</div>
				<div className='flex gap-5'>
					<h2>{tMyAccount('user-role')}</h2>
					<p className='flex justify-center items-center font-bold text-[1.4rem] ml-5 title-text-shadow'>
						{role}
					</p>
				</div>
				<div className='flex gap-5'>
					<h2>{tMyAccount('created-at')}</h2>
					<p className='flex justify-center items-center font-bold text-[1.4rem] ml-5 title-text-shadow'>
						{createdAt}
					</p>
				</div>
			</div>
		</>
	);
};

export default AboutMe;
