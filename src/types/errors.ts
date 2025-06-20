export interface AppErrorFields {
	title: string;
	message: string;
	tip: string;
}

export class AppError extends Error {
	title: string;
	message: string;
	tip: string;

	constructor({ title, message, tip }: AppErrorFields) {
		super();
		this.title = title;
		this.message = message;
		this.tip = tip;
	}
}
