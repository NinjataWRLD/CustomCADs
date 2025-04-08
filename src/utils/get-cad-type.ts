const getFileExtension = (file: File) =>
	file.name.slice(file.name.lastIndexOf('.')).toLowerCase();

export const getCadContentType = (file: File) => {
	if (file.type) return file.type;

	const map: Record<string, string> = {
		'.glb': 'model/gltf-binary',
		'.stl': 'model/stl',
	};
	return map[getFileExtension(file)] ?? 'application/octet-stream';
};

export const getCadType = (contentType: string) => {
	const map: Record<string, string> = {
		'model/gltf-binary': 'glb',
		'model/stl': 'stl',
	};
	return map[contentType];
};
