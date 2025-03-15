import { useEffect, useState } from 'react';
import { downloadTexture } from '@/api/customizations/materials';
import { useGetMaterials } from '@/hooks/queries/materials';
import { fetchFile } from '@/utils/file';

interface Material {
	blobUrl: string;
	density: number;
}

export const useTextures = () => {
	const [map, setMap] = useState<{ [key: string]: Material }>({});
	const { data } = useGetMaterials();

	useEffect(() => {
		if (data) {
			const fetchTextures = async () => {
				const materials = data.map(async (x) => ({
					id: x.id,
					density: x.density,
					texture: (await downloadTexture({ id: x.id })).data,
				}));
				const newMap: Record<string, Material> = {};

				await Promise.all(
					materials.map(async (material) => {
						const { id, density, texture } = await material;
						const blob = await fetchFile(
							texture.presignedUrl,
							texture.contentType,
						);

						newMap[id] = {
							density: density,
							blobUrl: URL.createObjectURL(blob),
						};
					}),
				);
				setMap(newMap);
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
