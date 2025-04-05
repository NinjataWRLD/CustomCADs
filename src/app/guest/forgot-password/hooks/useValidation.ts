import { z } from 'zod';
import {
	useErrorsTranslation,
	useLabelsTranslation,
} from '@/hooks/locales/components/forms';
import { user as validations } from '@/constants/validations';

export const useValidation = () => {
	const tErrors = useErrorsTranslation();
	const tLabels = useLabelsTranslation();

	const { email } = validations;

	const emailArgs = { field: tLabels('email') };

	const schema = z.object({
		email: z
			.string()
			.nonempty({ message: tErrors('required', emailArgs) })
			.regex(email.regex, tErrors('pattern', emailArgs)),
	});

	return schema;
};
