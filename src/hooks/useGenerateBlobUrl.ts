import { useEffect, useState } from 'react';
import { fetchFile } from '@/utils/file';

export const useGenerateBlobUrl = (
	presignedUrl?: string,
	contentType?: string,
) => {
	const [blobUrl, setBlobUrl] = useState('');

	useEffect(() => {
		const getFile = async () => {
			if (presignedUrl && contentType) {
				const blob = await fetchFile(presignedUrl, contentType);
				setBlobUrl(URL.createObjectURL(blob));
			}
		};
		getFile();

		return () => {
			URL.revokeObjectURL(blobUrl);
		};
	}, [presignedUrl, contentType]);

	return blobUrl;
};
