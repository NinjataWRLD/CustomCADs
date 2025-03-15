import { z } from 'zod';
import { useErrorsTranslation } from '@/hooks/locales/components/forms';
import { product as validations } from '@/constants/validations';

export const useValidation = () => {
	const tErrors = useErrorsTranslation();
	const { name, description, price } = validations;

	const nameArgs = {
		field: 'Username',
		min: name.min,
		max: name.max,
	};
	const descriptionArgs = {
		field: 'Description',
		min: description.min,
		max: description.max,
	};
	const priceArgs = {
		field: 'Price',
		min: price.min,
		max: price.max,
	};
	const imageArgs = { field: 'Image' };
	const cadArgs = { field: 'Cad' };

	const schema = z.object({
		name: z
			.string({ message: tErrors('required', nameArgs) })
			.min(name.min, tErrors('length', nameArgs))
			.max(name.max, tErrors('length', nameArgs)),
		description: z
			.string({ message: tErrors('required', descriptionArgs) })
			.min(description.min, tErrors('length', descriptionArgs))
			.max(description.max, tErrors('length', descriptionArgs)),
		price: z
			.number({ message: tErrors('required', priceArgs) })
			.min(price.min, tErrors('range', priceArgs))
			.max(price.max, tErrors('range', priceArgs)),
		categoryId: z.number(),
		image: z
			.instanceof(File, { message: tErrors('required', imageArgs) })
			.refine((file) => file.size > 0, {
				message: tErrors('empty-file', imageArgs),
			}),
		cad: z
			.instanceof(File, { message: tErrors('required', cadArgs) })
			.refine((file) => file.size > 0, {
				message: tErrors('empty-file', cadArgs),
			}),
	});

	return schema;
};
