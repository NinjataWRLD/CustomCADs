import { useEffect, useState } from 'react';
import { DownloadRequest } from '@/api/files/presigned';
import { useDownloadCadUrl } from '@/hooks/mutations/cads';
import { fetchFile } from '@/utils/file';

export const useCadBlobUrl = (
	cadId: DownloadRequest['id'] | undefined,
	relationType: DownloadRequest['relationType'],
) => {
	const { mutateAsync: downloadUrl } = useDownloadCadUrl();
	const [blobUrl, setBlobUrl] = useState<string | null>(null);
	const [progress, setProgress] = useState(0);

	const revokeUrl = (url: string | null) => {
		if (url) URL.revokeObjectURL(url);
	};

	useEffect(() => {
		if (cadId) {
			const getFile = async () => {
				revokeUrl(blobUrl);

				const { length, response } = await fetchFile(
					await downloadUrl({ id: cadId, relationType }),
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
			};
			getFile();
		}

		return () => {
			setBlobUrl((prevBlobUrl) => {
				revokeUrl(prevBlobUrl);
				return null;
			});
		};
	}, [cadId, relationType]);

	return { blobUrl, progress };
};
