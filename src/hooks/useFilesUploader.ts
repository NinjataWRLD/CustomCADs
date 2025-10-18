import { useUploadImageUrl } from '@/hooks/mutations/image';
import { useUploadCadUrl } from '@/hooks/mutations/cads';
import { uploadFile } from '@/utils/file';
import { getCadContentType } from '@/utils/get-cad-type';
import { FileData } from '@/types/files';
import { useEffect } from 'react';

export const useFilesUploader = (
	data: {
		name: string;
		image: File | null;
		cad: File | null;
	},
	onUploaded?: (files: { image: FileData; cad: FileData }) => void,
) => {
	const { mutateAsync: uploadImage } = useUploadImageUrl();
	const { mutateAsync: uploadCad } = useUploadCadUrl();

	useEffect(() => {
		if (data.name && data.image && data.cad) {
			const upload = async (
				image: File | null,
				cad: File | null,
				setFiles: (files: { image: FileData; cad: FileData }) => void,
			) => {
				if (!image || !cad)
					throw new Error('Image and Cad are required!');
				cad = new File([cad], cad.name, {
					type: getCadContentType(cad),
				});

				const imageRes = await uploadImage({
					name: data.name,
					file: { contentType: image.type, fileName: image.name },
					relationType: 'Product',
				});
				const cadRes = await uploadCad({
					name: data.name,
					file: { contentType: cad.type, fileName: cad.name },
					relationType: 'Product',
				});

				await Promise.all([
					uploadFile(imageRes.presignedUrl, image),
					uploadFile(cadRes.presignedUrl, cad),
				]);

				setFiles({
					image: { key: imageRes.generatedKey, type: image.type },
					cad: { key: cadRes.generatedKey, type: cad.type },
				});
			};
			upload(data.image, data.cad, (files) => onUploaded?.(files));
		}
	}, [data]);
};
