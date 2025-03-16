import { z } from 'zod';
import {
	useErrorsTranslation,
	useLabelsTranslation,
} from '@/hooks/locales/components/forms';
import { user as validations } from '@/constants/validations';

export const useValidation = () => {
	const tErrors = useErrorsTranslation();
	const tLabels = useLabelsTranslation();

	const { name, password } = validations;

	const usernameArgs = {
		field: tLabels('username'),
		min: name.min,
		max: name.max,
	};
	const passwordArgs = {
		field: tLabels('password'),
		min: password.min,
		max: password.max,
	};

	const schema = z.object({
		username: z
			.string()
			.nonempty({ message: tErrors('required', usernameArgs) })
			.max(name.max, { message: tErrors('length', usernameArgs) })
			.min(name.min, { message: tErrors('length', usernameArgs) }),
		password: z
			.string()
			.nonempty({ message: tErrors('required', passwordArgs) })
			.max(password.max, { message: tErrors('length', passwordArgs) })
			.min(password.min, { message: tErrors('length', passwordArgs) }),
		rememberMe: z.boolean(),
	});

	return schema;
};
