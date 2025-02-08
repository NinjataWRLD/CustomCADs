import { z } from 'zod';
import { useErrorsTranslation } from '@/hooks/locales/components/forms';
import validations from '@/constants/user';

const useValidation = () => {
	const tErrors = useErrorsTranslation();
	const { name, password } = validations;

	const usernameArgs = { field: 'Username', min: name.min, max: name.max };
	const passwordArgs = {
		field: 'Password',
		min: password.min,
		max: password.max,
	};

	const schema = z.object({
		username: z.string({ message: tErrors('required', usernameArgs) }),
		password: z.string({ message: tErrors('required', passwordArgs) }),
		rememberMe: z.boolean(),
	});

	return schema;
};

export default useValidation;
