import { z } from 'zod';
import { useErrorsTranslation } from '@/hooks/locales/components/forms';
import { user as validations } from '@/constants/validations';
import { fieldEqualityHelper } from '@/utils/form';

export const useValidation = () => {
	const tErrors = useErrorsTranslation();
	const { name, email, password } = validations;

	const emailArgs = { field: 'Email' };
	const usernameArgs = { field: 'Username', min: name.min, max: name.max };
	const firstNameArgs = { ...usernameArgs, field: 'First Name' };
	const lastNameArgs = { ...usernameArgs, field: 'First Name' };
	const passwordArgs = {
		field: 'Password',
		min: password.min,
		max: password.max,
	};

	const passwordEquality = fieldEqualityHelper();
	const schema = z.object({
		username: z
			.string({ message: tErrors('required', usernameArgs) })
			.max(name.max, tErrors('length', usernameArgs))
			.min(name.min, tErrors('length', usernameArgs)),
		firstName: z
			.string({ message: tErrors('required', firstNameArgs) })
			.max(name.max, tErrors('length', firstNameArgs))
			.min(name.min, tErrors('length', firstNameArgs))
			.optional(),
		lastName: z
			.string({ message: tErrors('required', lastNameArgs) })
			.max(name.max, tErrors('length', lastNameArgs))
			.min(name.min, tErrors('length', lastNameArgs))
			.optional(),
		email: z
			.string({ message: tErrors('required', emailArgs) })
			.regex(email.regex, tErrors('pattern', emailArgs)),
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
