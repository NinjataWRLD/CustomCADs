export const fetchFile = async (url: string, contentType: string) => {
	const response = await fetch(url, {
		headers: {
			'Content-Type': contentType,
		},
	});

	const length = response.headers.get('Content-Length');
	if (!response.ok || !length) {
		throw new Error(
			`Network response was not ok: ${response.status} ${response.statusText}`,
		);
	}

	return { response, length: parseInt(length) };
};

export const uploadFile = async (url: string, file: File) => {
	const response = await fetch(url, {
		method: 'PUT',
		headers: {
			'Content-Type': file.type,
			'x-amz-meta-file-name': file.name,
		},
		body: file,
	});

	if (!response.ok) {
		throw new Error(
			`Network response was not ok: ${response.status} ${response.statusText}`,
		);
	}
};
