import { z } from 'zod';
import {
	useErrorsTranslation,
	useLabelsTranslation,
} from '@/hooks/locales/components/forms';
import { user as validations } from '@/constants/validations';
import { equalityHelper } from '@/utils/form';

export const useValidation = () => {
	const tErrors = useErrorsTranslation();
	const tLabels = useLabelsTranslation();

	const { name, email, password } = validations;

	const emailArgs = { field: tLabels('email') };
	const usernameArgs = {
		field: tLabels('username'),
		min: name.min,
		max: name.max,
	};
	const firstNameArgs = { ...usernameArgs, field: tLabels('first-name') };
	const lastNameArgs = { ...usernameArgs, field: tLabels('last-name') };
	const passwordArgs = {
		field: tLabels('password'),
		min: password.min,
		max: password.max,
	};
	const confirmPasswordArgs = {
		...passwordArgs,
		field: tLabels('confirm-password'),
	};

	const passwordEquality = equalityHelper();
	const schema = z.object({
		username: z
			.string()
			.nonempty({ message: tErrors('required', usernameArgs) })
			.max(name.max, tErrors('length', usernameArgs))
			.min(name.min, tErrors('length', usernameArgs)),
		firstName: z
			.string()
			.nonempty({ message: tErrors('required', firstNameArgs) })
			.max(name.max, tErrors('length', firstNameArgs))
			.min(name.min, tErrors('length', firstNameArgs))
			.optional(),
		lastName: z
			.string()
			.nonempty({ message: tErrors('required', lastNameArgs) })
			.max(name.max, tErrors('length', lastNameArgs))
			.min(name.min, tErrors('length', lastNameArgs))
			.optional(),
		email: z
			.string()
			.nonempty({ message: tErrors('required', emailArgs) })
			.regex(email.regex, tErrors('pattern', emailArgs)),
		password: z
			.string()
			.nonempty({ message: tErrors('required', passwordArgs) })
			.max(password.max, tErrors('length', passwordArgs))
			.min(password.min, tErrors('length', passwordArgs))
			.refine(passwordEquality.sync),
		confirmPassword: z
			.string()
			.nonempty({ message: tErrors('required', confirmPasswordArgs) })
			.refine(passwordEquality.check, tErrors('equal-passwords')),
	});

	return schema;
};
