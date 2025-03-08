import { Dispatch, SetStateAction } from 'react';
import { upload } from '@/api/catalog/products/creator';
import uploadFile from '@/utils/upload-file';
import getCadType from '@/utils/get-cad-type';
import { FileData } from '@/types/files';

type SetState<TState> = Dispatch<SetStateAction<TState>>;

const useUploader = (
	setCad: SetState<File | null>,
	setFiles: SetState<{ image: FileData; cad: FileData } | undefined>,
) => {
	const uploadFiles = async (
		name: string,
		image: File | null,
		cad: File | null,
	) => {
		if (!image || !cad) throw new Error('Image and Cad are required!');

		cad = new File([cad], cad.name, { type: getCadType(cad) });
		setCad(cad);

		const { type: imageType, name: imageName } = image;
		const { name: cadName, type: cadType } = cad;

		const {
			data: {
				generatedImageKey: imageKey,
				presignedImageUrl: imageUrl,
				generatedCadKey: cadKey,
				presignedCadUrl: cadUrl,
			},
		} = await upload({
			productName: name,
			imageContentType: imageType,
			imageFileName: imageName,
			cadContentType: cadType,
			cadFileName: cadName,
		});

		await uploadFile(imageUrl, image);
		await uploadFile(cadUrl, cad);

		setFiles({
			image: { key: imageKey, type: imageType },
			cad: { key: cadKey, type: cadType },
		});
	};

	return uploadFiles;
};

export default useUploader;
