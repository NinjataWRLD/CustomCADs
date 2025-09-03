import { CommonStateError } from '@/locales/types/common/state';

export default {
	login_link: 'Sign In',
	contact_support_link: 'Contact Us',
	'400_title': 'Oops! Something Went Wrong.',
	'400_message':
		"The server couldn't understand your request. Please check your input and try again.",
	'400_tip': "Double-check the URL or form data you're submitting.",
	'401_title': 'Access Denied',
	'401_message': 'You need to log in to view this content.',
	'401_tip':
		"If you believe you're seeing this in error, please contact support.",
	'403_title': 'Access Forbidden',
	'403_message': "You don't have permission to access this resource.",
	'403_tip':
		'If you think you should have access, please reach out to the administrator.',
	'404_title': 'Page Not Found',
	'404_message': "We couldn't find the page you're looking for.",
	'404_tip': 'Double-check the URL or head back to the homepage.',
	default_title: 'Something Went Wrong',
	default_message: 'An unexpected error occurred. Please try again later.',
	default_tip: 'If the issue persists, contact our support team.',
} satisfies CommonStateError;
