import { useEffect, useState } from 'react';
import useCreateProduct from '@/hooks/mutations/products/creator/useCreateProduct';
import useCalculateVolume from '@/hooks/threejs/useCalculateVolume';
import useSetProductCadCoords from '@/hooks/mutations/products/creator/useSetProductCadCoords';
import { FileData } from '@/types/files';

type Files = { image: FileData; cad: FileData };

type ProductData = {
	name: string;
	description: string;
	price: number;
	categoryId: number;
};

const useCreator = (cad: File | null, files?: Files, data?: ProductData) => {
	const [id, setId] = useState<string>();
	const { volume: cadVolume, ref, getCoords } = useCalculateVolume(cad);

	const { mutateAsync: create } = useCreateProduct();
	const { mutateAsync: setCadCoords } = useSetProductCadCoords();

	useEffect(() => {
		if (files && data && cadVolume) {
			const handleCreate = async () => {
				const { id } = await create({
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
				setId(id);
			};
			handleCreate();
		}
	}, [files, data, cadVolume]);

	useEffect(() => {
		const coords = getCoords();
		if (id && coords) {
			const handleCoords = async () => {
				await setCadCoords({
					id: id,
					type: 'cam',
					coordinates: coords.cam,
				});
				await setCadCoords({
					id: id,
					type: 'pan',
					coordinates: coords.pan,
				});
			};
			handleCoords();
		}
	}, [id]);

	return ref;
};

export default useCreator;
