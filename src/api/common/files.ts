export interface DownloadResponse {
	presignedUrl: string;
	contentType: string;
}

export interface UploadRequest {
	fileName: string;
	contentType: string;
}

export interface UploadResponse {
	presignedUrl: string;
	generatedKey: string;
}
