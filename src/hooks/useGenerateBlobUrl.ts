import { useMemo } from 'react';

const useGenerateBlobUrl = (contentType: string, buffer: ArrayBuffer) =>
	useMemo(() => {
		if (!buffer) return '';
		const blob = new Blob([buffer], { type: contentType });
		return URL.createObjectURL(blob);
	}, [buffer, contentType]);

export default useGenerateBlobUrl;
