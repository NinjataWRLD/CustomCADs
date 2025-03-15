const map: Record<string, string> = {
	'.glb': 'model/gltf-binary',
	// more in the future
};

export const getCadType = (file: File) => {
	if (file.type) return file.type;

	const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
	return map[ext] || 'application/octet-stream';
};
