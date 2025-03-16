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

	const { password } = validations;

	const passwordArgs = {
		field: tLabels('password'),
		min: password.min,
		max: password.max,
	};
	const confirmPasswordArgs = {
		field: tLabels('confirm-password'),
		min: password.min,
		max: password.max,
	};

	const passwordEquality = equalityHelper();
	const schema = z.object({
		password: z
			.string({ message: tErrors('required', passwordArgs) })
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
