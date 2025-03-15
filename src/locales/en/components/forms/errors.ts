import { ComponentsFormsErrors } from '@/locales/types/components/forms';

export default {
	'empty-file': 'A nonempty file for {{field}} is required!',
	required: "The field '{{field}}' is required",
	length: "The length of '{{field}}' must be between {{min}} and {{max}}",
	range: "The value of '{{field}}' must be between {{min}} and {{max}}",
	required_symbol: "The field '{{field}}' must contain a '{{symbol}}' symbol",
	pattern: "The field '{{field}}' is not valid",
	equal: 'Passwords must be equal',
	invalid_data: 'Invalid data!',
	sign_in_error: 'Non-existent account or wrong password',
	locked_out_error:
		'The max attempts for logging in has been reached. The account has been locked out for {{seconds}} seconds',
} satisfies ComponentsFormsErrors;
