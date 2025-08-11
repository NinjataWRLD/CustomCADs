import { upload } from '@/api/catalog/products/creator';
import { uploadFile } from '@/utils/file';
import { getCadContentType } from '@/utils/get-cad-type';
import { FileData } from '@/types/files';

export const uploadFiles = async (
	name: string,
	image: File | null,
	cad: File | null,
	setFiles: (files: { image: FileData; cad: FileData }) => void,
) => {
	if (!image || !cad) throw new Error('Image and Cad are required!');
	cad = new File([cad], cad.name, { type: getCadContentType(cad) });

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

	await Promise.all([uploadFile(imageUrl, image), uploadFile(cadUrl, cad)]);

	setFiles({
		image: { key: imageKey, type: image.type },
		cad: { key: cadKey, type: cad.type },
	});
};
