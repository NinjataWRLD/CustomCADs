import { useEffect, useState } from 'react';
import { DownloadResponse } from '@/api/common/files';
import { fetchFile } from '@/utils/file';

export const useGenerateBlobUrl = (download?: DownloadResponse) => {
	const [blobUrl, setBlobUrl] = useState<string | null>(null);
	const [progress, setProgress] = useState(0);

	const revokeUrl = (url: string | null) => {
		if (url) URL.revokeObjectURL(url);
	};

	useEffect(() => {
		const getFile = async () => {
			revokeUrl(blobUrl);

			if (download) {
				const { presignedUrl, contentType } = download;

				const { length, response } = await fetchFile(
					presignedUrl,
					contentType,
				);

				const reader = response.body?.getReader()!;
				const parts: BlobPart[] = [];

				while (true) {
					const { done, value } = await reader.read();
					if (done) break;
					parts.push(value);
					setProgress((prev) => prev + value.length / length);
				}

				const blob = new Blob(parts);
				setBlobUrl(URL.createObjectURL(blob));
			}
		};
		getFile();

		return () => {
			setBlobUrl((prevBlobUrl) => {
				revokeUrl(prevBlobUrl);
				return null;
			});
		};
	}, [download]);

	return { blobUrl, progress };
};
