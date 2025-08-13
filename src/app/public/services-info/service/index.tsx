import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useServicesTranslation } from '@/hooks/locales/pages/public';
import Button from '@/app/components/button';

type ServiceProps = {
	title: string;
	details: string;
	role: string;
	icon: IconDefinition;
	button: string;
};

const Service = ({ title, details, role, icon, button }: ServiceProps) => {
	const tServices = useServicesTranslation();

	return (
		<div className='relative flex flex-col justify-between bg-white rounded-[15px] shadow-[0_6px_15px_rgba(94,53,177,0.1)] px-6 py-9 border-t-4 border-[#a02fc5] hover:-translate-y-2 hover:shadow-[0_12px_25px_rgba(94,53,177,0.2)] transition-transform duration-300 ease-in-out overflow-hidden group'>
			<div className='absolute bottom-[-50px] right-[-40px] w-[150px] h-[150px] rounded-full bg-[rgba(63,12,72,0.588)] transition-colors duration-300 group-hover:bg-[rgba(63,12,72,0.862)] z-0 flex items-center justify-center'>
				<FontAwesomeIcon
					icon={icon}
					className='text-white text-[3rem] mb-[20%] mr-[15%] z-10'
				/>
			</div>

			<div className='relative z-10 mb-5'>
				<div className='text-[1.5rem] font-semibold text-purple-900 mb-4'>
					{title}
				</div>
				<div className='text-[1rem] text-purple-700 leading-relaxed opacity-90'>
					{details}
				</div>
				<div className='text-[1rem] text-fuchsia-700 leading-relaxed opacity-90 mt-3'>
					{tServices('helperText')}{' '}
					<span className='font-bold'>{role}</span>
				</div>
			</div>

			<div className='relative self-start z-10'>
				<Button type='button' text={button} />
			</div>
		</div>
	);
};

export default Service;
