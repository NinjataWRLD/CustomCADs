import { useHomeTranslation } from '@/hooks/locales/pages/public';
import { useAuthStore } from '@/hooks/stores/useAuthStore';
import CustomLink from '@/app/components/link';

const Info = () => {
	const { is } = useAuthStore();
	const tHome = useHomeTranslation();

	return (
		<div className='text-[white] absolute w-2/5 flex flex-col items-center z-50 left-[5%] bottom-[30%]'>
			<h1
				className='w-full text-[3.5rem] text-center text-white'
				style={{
					textShadow:
						'3px 3px 5px rgba(75, 0, 130, 0.5),-3px -3px 5px rgba(138, 43, 226, 0.4), 0px 0px 8px rgba(138, 43, 226, 0.8),0px 0px 20px rgba(138, 43, 226, 0.6)',
				}}
			>
				{tHome('title_info')}
			</h1>
			<h2
				className={`text-2xl text-[hsl(0,0%,73%)] italic relative before:content-['“'] before:text-[2rem] before:text-[hsla(290,70%,70%,0.61)] before:absolute before:left-[-17px] before:-top-2.5 after:content-['”'] after:text-[2rem] after:text-[hsla(290,70%,70%,0.61)] after:absolute after:right-[-17px] after:-bottom-2.5`}
				style={{
					textShadow:
						'2px 2px 4px rgba(120, 120, 120, 0.5),4px 4px 8px rgba(0, 0, 0, 0.555)',
				}}
			>
				{tHome('subtitle_info')}
			</h2>
			<p className='leading-[1.8] text-[1.1rem] text-[rgb(186,186,186)] max-w-[600px] indent-[1em] tracking-[0.4px] text-center mx-auto my-0 px-5 py-2.5'>
				{tHome('info-1')}
			</p>
			<p className='leading-[1.8] text-[1.1rem] text-[rgb(186,186,186)] max-w-[600px] indent-[1em] tracking-[0.4px] text-center mx-auto my-0 px-5 py-2.5'>
				{tHome('info-2')}
			</p>
			{is.guest && (
				<div className='w-full flex flex-row justify-center items-center gap-10 mt-4'>
					<CustomLink
						to='/register/$role'
						params={{ role: 'customer' }}
						text={tHome('btn-1')}
					/>
					<h2 className='italic mb-[5px]'>{tHome('or')}</h2>
					<CustomLink
						to='/register/$role'
						params={{ role: 'contributor' }}
						text={tHome('btn-2')}
					/>
				</div>
			)}
		</div>
	);
};

export default Info;
