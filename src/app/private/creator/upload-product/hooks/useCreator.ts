import { useEffect, useState } from 'react';
import * as exchangeRates from '@/api/common/exchange-rates';
import { useIdempotencyKeys } from '@/hooks/useIdempotencyKeys';
import { useCreateProduct } from '@/hooks/mutations/products/creator';
import { useCreateCad, useSetCadCoords } from '@/hooks/mutations/cads';
import { useCreateImage } from '@/hooks/mutations/image';
import { useCalculateVolume } from '@/hooks/threejs/useCalculateVolume';
import { useCurrencyStore } from '@/hooks/stores/useCurrencyStore';
import { FileData } from '@/types/files';
import * as money from '@/utils/money';

type ProductData = {
	name: string;
	description: string;
	categoryId: number;
	price: number;
	image: File | null;
	cad: File | null;
};

export const useCreator = (
	files?: { image: FileData; cad: FileData },
	data?: ProductData,
	callback?: VoidFunction,
) => {
	const [id, setId] = useState<string>();
	const cad = data?.cad ?? null;
	const { volume: cadVolume, ref, getCoords } = useCalculateVolume(cad);

	const { idempotencyKeys } = useIdempotencyKeys(['create'] as const);
	const { current: currency } = useCurrencyStore();

	const { mutateAsync: createCad } = useCreateCad();
	const { mutateAsync: createImage } = useCreateImage();

	const { mutateAsync: createProduct } = useCreateProduct();
	const { mutateAsync: setCadCoords } = useSetCadCoords();

	useEffect(() => {
		if (files && data && cadVolume) {
			const handleCreate = async () => {
				const { data: rates } = await exchangeRates.all();
				const { money: price } = money.toBase({
					money: data.price,
					from: currency,
					rates,
				});

				const { id: imageId } = await createImage({
					generatedKey: files.image.key,
					contentType: files.image.type,
				});
				const { id: cadId } = await createCad({
					generatedKey: files.cad.key,
					contentType: files.cad.type,
					volume: cadVolume,
				});

				const { id } = await createProduct({
					idempotencyKey: idempotencyKeys.create,
					name: data.name,
					description: data.description,
					categoryId: data.categoryId,
					price: price,
					imageId: imageId,
					cadId: cadId,
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
					camCoordinates: coords.cam,
					panCoordinates: coords.pan,
				});
				if (callback) callback();
			};
			handleCoords();
		}
	}, [id]);

	return ref;
};
