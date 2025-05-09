import { useNavigate } from '@tanstack/react-router';
import { useHomeTranslation } from '@/hooks/locales/pages/public';
import Sheet from './sheets';

const Benefits = () => {
	const tHome = useHomeTranslation();
	const navigate = useNavigate();

	return (
		<div className='w-full h-[100dvh] text-[white] flex justify-center items-center gap-8 border-l-0 border-b-0 border-r-0 border-t-[3px] border-t-[hsl(274,77%,28%)] border-solid'>
			<div
				onClick={() => navigate({ to: '/gallery' })}
				className="bg-[url('/src/assets/section2.png')] bg-no-repeat bg-cover bg-center w-6/12 h-3/5 shadow-[0_8px_15px_rgba(0,0,0,0.4),0_4px_25px_rgba(128,0,128,0.5),inset_0_3px_6px_rgba(128,0,128,0.3)] cursor-pointer ml-[5%] mr-0 mt-[5%] mb-0 rounded-[10%] border-[5px] border-solid border-[rgba(128,0,128,0.395)] hover:shadow-[0_12px_25px_rgba(0,0,0,0.5),0_6px_130px_rgba(138,43,226,0.6)] hover:scale-105"
				style={{
					transition:
						'scale 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
				}}
			></div>
			<div className='flex flex-col flex-wrap items-center min-h-[60vh]'>
				<h1>{tHome('title_benefits')}?</h1>

				<Sheet
					icon='fas fa-eye'
					title={tHome('benefits-subtitle-1')}
					details={tHome('benefits-text-1')}
				/>
				<Sheet
					icon='fas fa-robot'
					title={tHome('benefits-subtitle-2')}
					details={tHome('benefits-text-2')}
				/>
				<Sheet
					icon='fas fa-globe'
					title={tHome('benefits-subtitle-3')}
					details={tHome('benefits-text-3')}
				/>
			</div>
		</div>
	);
};

export default Benefits;
