import { useEffect, useState } from 'react';
import { downloadTexture } from '@/api/printing/materials';
import { useGetMaterials } from '@/hooks/queries/materials';
import { fetchFile } from '@/utils/file';

interface Material {
	blobUrl: string;
	euroPerKg: number;
	density: number;
}

export const useTextures = (enabled?: boolean) => {
	const [map, setMap] = useState<Record<string, Material>>({});
	const { data } = useGetMaterials(!!enabled);

	useEffect(() => {
		if (data) {
			const fetchTextures = async () => {
				const materials = data.map(async (x) => {
					const { data: texture } = await downloadTexture({
						id: x.id,
					});

					const { response } = await fetchFile(
						texture.presignedUrl,
						texture.contentType,
					);

					return {
						id: x.id,
						density: x.density,
						euroPerKg: x.cost,
						blobUrl: URL.createObjectURL(await response.blob()),
					};
				});

				const newMap = await Promise.all(materials);
				setMap((prevMap) => {
					const updatedMap = { ...prevMap };
					newMap.forEach(({ id, density, euroPerKg, blobUrl }) => {
						updatedMap[id] = { density, euroPerKg, blobUrl };
					});
					return updatedMap;
				});
			};
			fetchTextures();
		}

		return () => {
			Object.values(map)
				.map((x) => x.blobUrl)
				.forEach(URL.revokeObjectURL);
		};
	}, [data]);

	return map;
};
