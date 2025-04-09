import { useEffect, useState } from 'react';
import { downloadTexture } from '@/api/customizations/materials';
import { useGetMaterials } from '@/hooks/queries/materials';
import { fetchFile } from '@/utils/file';

interface Material {
	blobUrl: string;
	density: number;
}

export const useTextures = () => {
	const [map, setMap] = useState<Record<string, Material>>({});
	const { data } = useGetMaterials();

	useEffect(() => {
		if (data) {
			const fetchTextures = async () => {
				const materials = data.map(async (x) => {
					const { data: texture } = await downloadTexture({
						id: x.id,
					});
					const blob = await fetchFile(
						texture.presignedUrl,
						texture.contentType,
					);

					return {
						id: x.id,
						density: x.density,
						blobUrl: URL.createObjectURL(blob),
					};
				});

				const newMap = await Promise.all(materials);
				setMap((prevMap) => {
					const updatedMap = { ...prevMap };
					newMap.forEach(({ id, density, blobUrl }) => {
						updatedMap[id] = { density, blobUrl };
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
