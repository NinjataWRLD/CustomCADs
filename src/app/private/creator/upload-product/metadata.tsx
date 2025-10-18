import { ReactNode } from 'react';
import { useUploadProductTranslation } from '@/hooks/locales/pages/creator';
import Border from '@/app/components/border';
import FormError from '@/app/components/fields/error';

type UploadProductMetadataProps = {
	children?: ReactNode;
	error?: string;
};
const UploadProductMetadata = ({
	children,
	error,
}: UploadProductMetadataProps) => {
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

export default UploadProductMetadata;
