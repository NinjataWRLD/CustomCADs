/* eslint-disable prefer-destructuring */
/* eslint-disable no-var */
/* eslint-disable eqeqeq */
/* eslint-disable func-style */
function generateRedirectRequestObject(domain, uri, statusCode) {
	return {
		statusCode: statusCode || 301,
		statusDescription: 'Moved Permanently',
		headers: {
			location: {
				value: `https://www.${domain}${uri}`,
			},
		},
	};
}

var domain = 'customcads.com';
function handler(event) {
	var request = event.request;
	var host = request.headers.host;

	return host && host.value == domain
		? generateRedirectRequestObject(domain, request.uri)
		: request;
}
