import { useEffect, useState } from 'react';
import * as imagesApi from '@/api/files/images';
import { useGetMaterials } from '@/hooks/queries/materials';
import { fetchFile } from '@/utils/file';

type Material = {
	blobUrl: string;
	euroPerKg: number;
	density: number;
};

export const useTextures = (enabled?: boolean) => {
	const [map, setMap] = useState<Record<string, Material>>({});
	const { data } = useGetMaterials(!!enabled);

	useEffect(() => {
		if (data) {
			const fetchTextures = async () => {
				const materials = data.map(async (x) => {
					const { data: presigned } = await imagesApi.downloadUrl({
						id: x.textureId,
						relationType: 'Material',
					});
					const { response } = await fetchFile(presigned);

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
