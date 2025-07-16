import { useMyAccountTranslation } from '@/hooks/locales/pages/public';
import Row from './row';

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
			<div className='relative flex flex-col gap-10'>
				<Row
					fields={[
						{ label: tMyAccount('user-role'), value: role },
						{ label: tMyAccount('username'), value: username },
					]}
				/>
				<Row
					fields={[
						{ label: tMyAccount('first-name'), value: firstName },
						{ label: tMyAccount('last-name'), value: lastName },
					]}
				/>
				<Row
					fields={[
						{ label: tMyAccount('created-at'), value: createdAt },
					]}
				/>
			</div>
		</>
	);
};

export default AboutMe;
