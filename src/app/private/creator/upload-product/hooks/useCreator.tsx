import { useEffect } from 'react';
import useCreateProduct from '@/hooks/mutations/products/creator/useCreateProduct';
import useCalculateVolume from '@/hooks/threejs/useCalculateVolume';
import { FileData } from '@/types/files';

type Files = { image: FileData; cad: FileData };

type ProductData = {
	name: string;
	description: string;
	price: number;
	categoryId: number;
};

const useCreator = (cad: File | null, files?: Files, data?: ProductData) => {
	const { mutateAsync: create } = useCreateProduct();
	const { volume: cadVolume, ref } = useCalculateVolume(cad);

	useEffect(() => {
		if (files && data && cadVolume) {
			create({
				name: data.name,
				description: data.description,
				categoryId: data.categoryId,
				price: data.price,
				imageKey: files.image.key,
				imageContentType: files.image.type,
				cadKey: files.cad.key,
				cadContentType: files.cad.type,
				cadVolume: cadVolume,
			});
		}
	}, [files, data, cadVolume]);

	return ref;
};

export default useCreator;
