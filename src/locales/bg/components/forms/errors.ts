import { ComponentsFormsErrors } from '@/locales/types/components/forms';

export default {
	'empty-file': 'Непразен файл е задължителен за {{field}}',
	required: "Полето '{{field}}' е задължително",
	length: "Дължината на '{{field}}' трябва да е между {{min}} и {{max}}",
	range: "Стойността на '{{field}}' трябва да е между {{min}} и {{max}}",
	required_symbol:
		"Полето '{{field}}' трябва да съдържа символа '{{symbol}}'",
	pattern: "Полето '{{field}}' не е валидно",
	'equal-passwords': 'Паролите трябва да са еднакви',
	invalid_data: 'Невалидни данни',
	sign_in_error: 'Несъществуващ акаунт или грешна парола',
	locked_out_error:
		'Максималният брой опити за влизане е достигнат. Акаунтът е заключен за още {{seconds}} секунди',
} satisfies ComponentsFormsErrors;
