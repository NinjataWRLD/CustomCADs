import { useEffect, useState } from 'react';
import { useGetMaterials } from '@/hooks/queries/materials';
import { useEditorTranslation } from '@/hooks/locales/pages/public';
import { useOthersTranslation } from '@/hooks/locales/common/others';
import { useEditorStore } from '@/hooks/stores/useEditorStore';
import { setColor, setMaterialId } from '@/stores/editor-store';
import Loader from '@/app/components/state/loading';

type LooksProps = {
	id: string;
};

const Looks = ({ id }: LooksProps) => {
	const { data: materials } = useGetMaterials();
	const { materialId, color } = useEditorStore(id);

	const tOthers = useOthersTranslation();
	const tEditor = useEditorTranslation();

	const [fadeIn, setFadeIn] = useState(false);

	useEffect(() => {
		const styleEl = document.createElement('style');
		styleEl.textContent = `
		  .fade-in {
				opacity: 0;
				transform: translateY(100px);
				animation: fadeIn 0.5s ease-in-out forwards;
			}

			@keyframes fadeIn {
				to {
					opacity: 1;
					transform: translateY(0);
				}
			}
		`;
		document.head.appendChild(styleEl);

		setFadeIn(true);

		return () => {
			document.head.removeChild(styleEl);
		};
	}, []);

	if (!materials) return <Loader />;
	return (
		<div
			className={`py-2.5 px-4 bg-blue-200 rounded-b-lg border-2 border-t-0 border-purple-500 mb-2.5 opacity-0 ${fadeIn ? 'fade-in' : ''}`}
		>
			{materials.map(({ id: mId, name: mName, density: mDensity }) => (
				<div
					key={mId}
					onClick={() => setMaterialId(id, mId)}
					className={`my-1.5 cursor-pointer ${
						materialId === mId
							? 'text-purple-700'
							: 'text-gray-600 hover:text-purple-600'
					}`}
				>
					{mName} - {`${mDensity}g/cm³`}
				</div>
			))}
			<br />
			<div className='mt-4 flex items-center'>
				<label htmlFor='color' className='font-medium mr-3'>
					{tOthers('color')}:
				</label>
				<div className='relative'>
					<input
						id='color'
						type='color'
						value={color}
						onChange={(e) => setColor(id, e.target.value)}
						className='w-12 h-8 border-0 rounded cursor-pointer overflow-hidden'
						style={{
							WebkitAppearance: 'none',
						}}
					/>
					<div
						className='absolute pointer-events-none -top-1 -left-1 w-14 h-10 border-2 border-gray-300 rounded-md'
						style={{
							boxShadow: '0 0 0 1px rgba(0,0,0,0.1) inset',
						}}
					/>
				</div>
				{color !== '#ffffff' && (
					<button
						onClick={() => setColor(id, '#ffffff')}
						className='ml-4 px-3 py-1 bg-gray-200 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-300 transition-colors duration-200 flex items-center'
					>
						<svg
							className='w-3 h-3 mr-1'
							fill='currentColor'
							viewBox='0 0 20 20'
						>
							<path
								fillRule='evenodd'
								d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
								clipRule='evenodd'
							/>
						</svg>
						{tEditor('clear-color')}
					</button>
				)}
			</div>
		</div>
	);
};

export default Looks;
