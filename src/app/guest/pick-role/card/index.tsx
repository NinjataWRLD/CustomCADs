import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { usePickRoleTranslation } from '@/hooks/locales/pages/guest';
import CustomLink from '@/app/components/link';

const Card = ({ id }: { id: 'customer' | 'contributor' }) => {
	const tPickRole = usePickRoleTranslation();

	const bgGradient =
		id === 'customer'
			? 'bg-gradient-to-b from-[hsla(310,77%,15%,0.639)] to-[#635bf692]'
			: 'bg-gradient-to-b from-[hsla(141,33%,39%,0.565)] to-[#9b4eff81]';

	return (
		<div
			className={`relative w-1/4 h-[70%] ${bgGradient} rounded-[20px] rounded-b-[200px] shadow-[0_15px_0_hsla(0,0%,100%,0.705),inset_0_-15px_0_rgba(255,255,255,0.304),0_45px_0_hsla(0,0%,0%,0.315)] overflow-hidden flex justify-center items-start`}
		>
			<div className='absolute -top-[30%] -left-[40%] w-full h-[150%] rotate-[35deg] pointer-events-none blur-[10px] bg-gradient-to-r from-transparent to-[hsla(0,0%,100%,0.075)]'></div>

			<div className='relative w-[60%] h-[20%] flex justify-center items-center rounded-b-[120px] bg-gradient-to-br from-[hsla(270,39%,20%,0.61)] via-[hsla(270,55%,35%,0.5)] to-[hsla(270,30%,25%,0.6)] shadow-[0_10px_0_rgba(0,0,0,0.1),inset_0_-8px_0_white]'>
				<FontAwesomeIcon
					icon={id === 'customer' ? faUser : faLightbulb}
					className='text-white text-[4.5em] mb-4'
				/>
			</div>

			<div className='absolute top-[25%] w-full flex flex-col items-center justify-center'>
				<h2 className='text-center text-3xl subtitle-text-shadow'>
					{tPickRole(`${id}-subtitle`)}
				</h2>
				<ul className='fa-ul mt-2'>
					{[
						tPickRole(`${id}-plus-1`),
						tPickRole(`${id}-plus-2`),
						tPickRole(`${id}-plus-3`),
					].map((p) => (
						<li key={p} className='text-[1.1rem] mb-[10px]'>
							<span className='fa-li text-white/60'>
								<FontAwesomeIcon icon={faPlus} />
							</span>
							{p}
						</li>
					))}
				</ul>
			</div>

			<div className='absolute bottom-[15%]'>
				<CustomLink
					text={tPickRole('btn')}
					to='/register/$role'
					params={{ role: id }}
				/>
			</div>
		</div>
	);
};

export default Card;
