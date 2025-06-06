import { useEffect, useState } from 'react';
import { useThreeJS } from '@/hooks/threejs/useThreeJS';
import { calculateCadVolume } from '@/utils/volume-calculator';
import { getCadContentType, getCadType } from '@/utils/get-cad-type';

const emptyCoords = { x: 0, y: 0, z: 0 };

export const useCalculateVolume = (file: File | null) => {
	const [blobUrl, setBlobUrl] = useState<string | null>(null);
	const [volume, setVolume] = useState<number | null>(null);

	useEffect(() => {
		if (file) {
			setBlobUrl(URL.createObjectURL(file));
		}
		return () => {
			if (blobUrl) URL.revokeObjectURL(blobUrl);
		};
	}, [file]);

	const { instance, ref } = useThreeJS(
		blobUrl ?? '',
		file ? getCadType(getCadContentType(file)) : '',
		{ cam: emptyCoords, pan: emptyCoords },
		(cad) => setVolume(calculateCadVolume(cad)),
	);

	return { volume, ref, getCoords: () => instance?.getCoords() };
};
