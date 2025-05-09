import { usePickRoleTranslation } from '@/hooks/locales/pages/guest';
import Transition from '@/app/components/transition';
import Card from './card';

const PickRole = () => {
	const tPickRole = usePickRoleTranslation();

	return (
		<Transition>
			<div className='relative flex flex-col w-full h-[100dvh] items-center justify-center text-[white]'>
				<h1 className='absolute top-[6%]'>{tPickRole('title')}</h1>
				<div className='w-full h-[90%] flex items-center justify-center gap-[10%]'>
					<Card id='customer' />
					<Card id='contributor' />
				</div>
			</div>
		</Transition>
	);
};

export default PickRole;
