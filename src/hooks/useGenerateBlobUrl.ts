import { useEffect, useState } from 'react';
import { DownloadResponse } from '@/api/common/files';
import { fetchFile } from '@/utils/file';

export const useGenerateBlobUrl = (download?: DownloadResponse) => {
	const [blobUrl, setBlobUrl] = useState('');

	useEffect(() => {
		const getFile = async () => {
			if (download) {
				const { presignedUrl, contentType } = download;

				const blob = await fetchFile(presignedUrl, contentType);
				setBlobUrl(URL.createObjectURL(blob));
			}
		};
		getFile();

		return () => {
			setBlobUrl((prevBlobUrl) => {
				if (prevBlobUrl) {
					URL.revokeObjectURL(prevBlobUrl);
				}
				return '';
			});
		};
	}, [download]);

	return blobUrl;
};
