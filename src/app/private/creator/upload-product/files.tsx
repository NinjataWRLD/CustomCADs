import { ReactNode } from 'react';
import Border from '@/app/components/border';
import { useUploadProductTranslation } from '@/hooks/locales/pages/creator';
import FormError from '@/app/components/fields/error';

type UploadProductFilesProps = {
	children?: ReactNode;
	error?: string;
};
const UploadProductFiles = ({ children, error }: UploadProductFilesProps) => {
	const tUploadProduct = useUploadProductTranslation();

	return (
		<form className='relative upload-form w-1/2 flex flex-col justify-center items-center p-12 gap-4 mb-3'>
			<Border />

			<h1 className='title-text-shadow transition-all duration-300'>
				{tUploadProduct('title')}
			</h1>

			{children}

			<FormError error={error} />
		</form>
	);
};

export default UploadProductFiles;
