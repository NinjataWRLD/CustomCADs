import { z } from 'zod';
import {
	useErrorsTranslation,
	useLabelsTranslation,
} from '@/hooks/locales/components/forms';
import { shipment as validations } from '@/constants/validations';

export const useValidation = () => {
	const tErrors = useErrorsTranslation();
	const tLabels = useLabelsTranslation();

	const { email, phone } = validations;
	const countryArgs = {
		field: tLabels('country'),
	};
	const cityArgs = {
		field: tLabels('city'),
	};
	const emailArgs = {
		field: tLabels('email'),
		regex: email.regex,
	};
	const phoneArgs = {
		field: tLabels('phone'),
		regex: phone.regex,
	};
	const countArgs = {
		field: tLabels('count'),
		min: 1,
		max: 1000,
	};

	const schema = z.object({
		country: z
			.string()
			.nonempty({ message: tErrors('required', countryArgs) }),
		city: z.string().nonempty({ message: tErrors('required', cityArgs) }),
		email: z
			.string()
			.nonempty({ message: tErrors('required', emailArgs) })
			.regex(email.regex, { message: tErrors('pattern', emailArgs) }),
		phone: z
			.string()
			.nonempty({ message: tErrors('required', phoneArgs) })
			.regex(phone.regex, { message: tErrors('pattern', phoneArgs) }),
		count: z.number().min(1, { message: tErrors('range', countArgs) }),
	});

	return schema;
};
