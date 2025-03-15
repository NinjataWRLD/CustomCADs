import { z } from 'zod';
import { useErrorsTranslation } from '@/hooks/locales/components/forms';
import { user as validations } from '@/constants/validations';

export const useValidation = () => {
	const tErrors = useErrorsTranslation();
	const { email } = validations;

	const emailArgs = { field: 'Email' };

	const schema = z.object({
		email: z
			.string({ message: tErrors('required', emailArgs) })
			.regex(email.regex, tErrors('pattern', emailArgs)),
	});

	return schema;
};
