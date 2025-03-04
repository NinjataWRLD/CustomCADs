const fetchFile = async (url: string, contentType: string) => {
	const response = await fetch(url, {
		headers: {
			'Content-Type': contentType,
		},
	});

	if (!response.ok) {
		throw new Error(
			`Network response was not ok: ${response.status} ${response.statusText}`,
		);
	}
	return await response.blob();
};

export default fetchFile;
