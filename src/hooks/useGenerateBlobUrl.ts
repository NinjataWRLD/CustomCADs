import { useEffect, useMemo, useState } from 'react';
import fetchFile from '@/utils/fetch-file';

const useGenerateBlobUrl = (presignedUrl?: string, contentType?: string) => {
	const [buffer, setBuffer] = useState(new ArrayBuffer());

	useEffect(() => {
		const getFile = async () => {
			if (presignedUrl && contentType) {
				const buffer = await fetchFile(presignedUrl, contentType);
				setBuffer(buffer);
			}
		};
		getFile();
	}, [presignedUrl, contentType]);

	const blobUrl = useMemo(() => {
		if (!buffer.byteLength) return '';
		const blob = new Blob([buffer], { type: contentType });
		return URL.createObjectURL(blob);
	}, [buffer, contentType]);

	return blobUrl;
};

export default useGenerateBlobUrl;
