export type DownloadResponse = {
	presignedUrl: string;
	contentType: string;
};

export type UploadRequest = {
	fileName: string;
	contentType: string;
};

export type UploadResponse = {
	presignedUrl: string;
	generatedKey: string;
};
