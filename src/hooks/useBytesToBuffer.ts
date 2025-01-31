import fetchFile from '@/utils/fetch-file';
import { useEffect, useState } from 'react';

const useBytesToBuffer = (presignedUrl: string, contentType: string) => {
	const [buffer, setBuffer] = useState<ArrayBuffer>(new ArrayBuffer());

	useEffect(() => {
		const getFile = async () => {
			if (presignedUrl && contentType) {
				const buffer = await fetchFile(presignedUrl, contentType);
				setBuffer(buffer);
			}
		};
		getFile();
	}, [presignedUrl, contentType]);

	return buffer;
};

export default useBytesToBuffer;
