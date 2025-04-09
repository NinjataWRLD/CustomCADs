import { Dispatch, SetStateAction } from 'react';
import { upload } from '@/api/catalog/products/creator';
import { uploadFile } from '@/utils/file';
import { getCadType } from '@/utils/get-cad-type';
import { FileData } from '@/types/files';

type SetState<TState> = Dispatch<SetStateAction<TState>>;

export const useUploader = (
	setFiles: SetState<{ image: FileData; cad: FileData } | undefined>,
) => {
	const uploadFiles = async (
		name: string,
		image: File | null,
		cad: File | null,
	) => {
		if (!image || !cad) throw new Error('Image and Cad are required!');
		cad = new File([cad], cad.name, { type: getCadType(cad) });

		const {
			data: {
				image: { generatedKey: imageKey, presignedUrl: imageUrl },
				cad: { generatedKey: cadKey, presignedUrl: cadUrl },
			},
		} = await upload({
			productName: name,
			image: { contentType: image.type, fileName: image.name },
			cad: { contentType: cad.type, fileName: cad.name },
		});

		await uploadFile(imageUrl, image);
		await uploadFile(cadUrl, cad);

		setFiles({
			image: { key: imageKey, type: image.type },
			cad: { key: cadKey, type: cad.type },
		});
	};

	return uploadFiles;
};
