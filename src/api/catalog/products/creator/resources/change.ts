export interface Request {
	id: string;
	contentType: string;
	fileName: string;
}

export interface Response {
	presignedUrl: string;
}
