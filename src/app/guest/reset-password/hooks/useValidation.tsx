import { z } from 'zod';
import { useErrorsTranslation } from '@/hooks/locales/components/forms';
import { user as validations } from '@/constants/validations';
import { fieldEqualityHelper } from '@/utils/form';

export const useValidation = () => {
	const tErrors = useErrorsTranslation();
	const { password } = validations;

	const passwordArgs = {
		field: 'Password',
		min: password.min,
		max: password.max,
	};

	const passwordEquality = fieldEqualityHelper();
	const schema = z.object({
		password: z
			.string({ message: tErrors('required', passwordArgs) })
			.max(password.max, tErrors('length', passwordArgs))
			.min(password.min, tErrors('length', passwordArgs))
			.refine(passwordEquality.sync),
		confirmPassword: z
			.string({ message: tErrors('required', passwordArgs) })
			.refine(passwordEquality.check),
	});

	return schema;
};
