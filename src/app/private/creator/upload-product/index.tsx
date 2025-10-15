import { useState } from 'react';
import { useUploadProductTranslation } from '@/hooks/locales/pages/creator';
import MultiStepForm from '@/app/components/form/multi-step';
import Loader from '@/app/components/state/loading';
import { useFields } from './hooks/useFields';
import UploadProductMetadata from './metadata';
import UploadProductFiles from './files';
import Popup from './popup';

const UploadProduct = () => {
	type Popup = 'image' | 'cad';
	const [popup, setPopup] = useState<Popup | null>(null);

	const {
		ref,
		files,
		validate,
		handleSubmit,
		fields,
		cadRenderProgress,
		error,
	} = useFields({
		onUpload: {
			cad: () => setPopup('cad'),
			image: () => setPopup('image'),
		},
	});
	const tUploadProduct = useUploadProductTranslation();

	return (
		<MultiStepForm
			onSubmit={handleSubmit}
			steps={[
				{
					validate: validate.files,
					form: (
						<>
							<UploadProductFiles error={error}>
								<div className='flex justify-between gap-20 mb-5'>
									<div className='w-1/2 pr-1 flex flex-col items-center gap-4'>
										{fields.Image}
										{files.image && (
											<span
												onClick={() =>
													setPopup('image')
												}
												className='w-1/3 text-center px-4 py-3 rounded-xl text-white bg-[hsla(271,42%,54%,0.358)] cursor-pointer hover:opacity-80 ease-in duration-150'
											>
												{tUploadProduct('preview')}
											</span>
										)}
									</div>
									<div className='w-1/2 pl-1 flex flex-col items-center gap-4'>
										{fields.Cad}
										{files.cad && (
											<span
												onClick={() => setPopup('cad')}
												className='w-1/3 text-center px-4 py-3 rounded-xl text-white bg-[hsla(271,42%,54%,0.358)] cursor-pointer hover:opacity-80 ease-in duration-150'
											>
												{tUploadProduct('preview')}
											</span>
										)}
									</div>
								</div>
							</UploadProductFiles>
							<Popup
								type='image'
								isActive={popup === 'image'}
								hide={() => setPopup(null)}
							>
								<img
									src={files.image}
									className='max-w-96 max-h-96 rounded-2xl'
								/>
							</Popup>
							<Popup
								type='cad'
								isActive={popup === 'cad'}
								hide={() => setPopup(null)}
							>
								<div className='w-full h-full flex flex-col justify-center items-center rounded-2xl'>
									{cadRenderProgress < 1 && (
										<Loader
											progress={cadRenderProgress}
											isCad
										/>
									)}
									<div
										ref={ref}
										className='w-full h-full backdrop-blur-sm rounded-xl overflow-hidden flex justify-center items-center transition-all duration-300'
									/>
								</div>
							</Popup>
						</>
					),
				},
				{
					validate: validate.metadata,
					form: (
						<UploadProductMetadata error={error}>
							<div className='w-3/4 flex flex-col gap-10 mb-5'>
								{fields.Name}
							</div>
							<div className='w-3/4 flex justify-between gap-10 mb-5'>
								{fields.Category}
								{fields.Price}
							</div>
							<div className='w-3/4 flex flex-col gap-10 mb-5'>
								<div className='description-field-wrapper w-full'>
									{fields.Description}
								</div>
							</div>
						</UploadProductMetadata>
					),
				},
			]}
		/>
	);
};

export default UploadProduct;
