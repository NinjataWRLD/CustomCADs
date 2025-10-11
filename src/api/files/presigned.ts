type RelationType = 'Product' | 'Custom' | 'PurchasedCart' | 'Material';
type FileUpload = {
	contentType: string;
	fileName: string;
};

export type DownloadRequest = {
	id: string;
	relationType: RelationType;
};
export type DownloadResponse = {
	contentType: string;
	presignedUrl: string;
};

export type UploadRequest = {
	name: string;
	file: FileUpload;
	relationType: RelationType;
};
export type UploadResponse = {
	generatedKey: string;
	presignedUrl: string;
};

export type ReplaceRequest = {
	id: string;
	file: FileUpload;
	relationType: RelationType;
};
export type ReplaceResponse = string;

export const url = (
	file: 'cad' | 'image',
	operation: 'download' | 'upload' | 'replace',
) => `${file}s/presigned/${operation}`;
