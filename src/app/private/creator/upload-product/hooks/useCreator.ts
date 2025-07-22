import { useEffect, useState } from 'react';
import { useIdempotencyKeys } from '@/hooks/useIdempotencyKeys';
import {
	useCreateProduct,
	useSetProductCadCoords,
} from '@/hooks/mutations/products/creator';
import { useCalculateVolume } from '@/hooks/threejs/useCalculateVolume';
import { FileData } from '@/types/files';
import * as money from '@/utils/money';

type Files = { image: FileData; cad: FileData };

type ProductData = {
	name: string;
	description: string;
	price: number;
	categoryId: number;
};

export const useCreator = (
	cad: File | null,
	files?: Files,
	data?: ProductData,
	callback?: VoidFunction,
) => {
	const [id, setId] = useState<string>();
	const { volume: cadVolume, ref, getCoords } = useCalculateVolume(cad);

	const { idempotencyKeys } = useIdempotencyKeys(['create'] as const);
	const { mutateAsync: create } = useCreateProduct();
	const { mutateAsync: setCadCoords } = useSetProductCadCoords();

	useEffect(() => {
		if (files && data && cadVolume) {
			const handleCreate = async () => {
				const { id } = await create({
					idempotencyKey: idempotencyKeys.create,
					name: data.name,
					description: data.description,
					categoryId: data.categoryId,
					price: money.toBase({ money: data.price }),
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
				if (callback) callback();
			};
			handleCoords();
		}
	}, [id]);

	return ref;
};
