import { useEffect } from 'react';
import Transition from '@/app/components/transition';
import { useFields } from './hooks/useFields';
import Button from '@/app/components/button';
import Border from '@/app/components/border';
import { useUploadProductTranslation } from '@/hooks/locales/pages/creator';

const UploadProduct = () => {
	const { ref, cadSet, handleSubmit, fields } = useFields();
	const tUploadProduct = useUploadProductTranslation();

	useEffect(() => {
		const styleEl = document.createElement('style');
		styleEl.textContent = `
      .upload-form:hover .title-text-shadow {
        color: #fff;
        text-shadow:
          0 0 10px rgba(138, 43, 226, 0.8),
          0 0 20px rgba(138, 43, 226, 0.6),
          0 0 30px rgba(186, 85, 211, 0.7),
          0 0 40px rgba(186, 85, 211, 0.5);
      }
    `;
		document.head.appendChild(styleEl);

		return () => {
			document.head.removeChild(styleEl);
		};
	}, []);

	return (
		<Transition>
			<div className='h-[110dvh] flex justify-center items-center text-white'>
				<form
					onSubmit={handleSubmit}
					className='relative upload-form w-1/2 flex flex-col justify-center items-center p-12 gap-4 mb-3'
				>
					<Border />
					<h1 className='title-text-shadow transition-all duration-300'>
						{tUploadProduct('title')}
					</h1>

					<div className='w-3/4 flex flex-col gap-[10px] mb-5'>
						{fields.Name}
					</div>

					<div className='w-3/4 flex justify-between gap-[10px] mb-5'>
						{fields.Category}
						{fields.Price}
					</div>

					<div className='w-3/4 flex flex-col gap-[10px] mb-5'>
						<div className='description-field-wrapper w-full'>
							{fields.Description}
						</div>
					</div>

					<div className='w-3/4 flex justify-between gap-[10px] mb-5'>
						<div className='w-1/2 pr-1'>{fields.Image}</div>
						<div className='w-1/2 pl-1'>{fields.Cad}</div>
					</div>

					<div className='mt-6'>
						<Button type='submit' text={tUploadProduct('btn')} />
					</div>
				</form>
				<div
					ref={ref}
					className={
						cadSet
							? 'w-1/4 h-4/5 bg-gray-900/50 backdrop-blur-sm rounded-xl border-2 border-purple-500/50 shadow-lg shadow-purple-500/30 overflow-hidden flex justify-center items-center p-4 ml-8 transition-all duration-300'
							: 'hidden'
					}
				/>
			</div>
		</Transition>
	);
};

export default UploadProduct;
