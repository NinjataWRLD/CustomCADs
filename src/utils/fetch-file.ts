const fetchFile = async (url: string, contentType: string) => {
	const data = await fetch(url, {
		headers: {
			'Content-Type': contentType,
		},
	});

	return await data.arrayBuffer();
};

export default fetchFile;
