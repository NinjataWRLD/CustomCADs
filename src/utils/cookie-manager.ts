const getCookie = (cookieName: string): string | undefined => {
	const cookies = document.cookie
		.split('; ')
		.map((cookie) => cookie.split('='))
		.map(([name, value]) => ({ name, value }));

	const cookie = cookies.find((cookie) => cookie.name === cookieName);
	return cookie?.value;
};

const setCookie = (cookieName: string, cookieValue: string) => {
	document.cookie = `${cookieName}=${cookieValue}`;
};

export { getCookie, setCookie };
