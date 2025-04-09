import { z } from 'zod';
import {
	useErrorsTranslation,
	useLabelsTranslation,
} from '@/hooks/locales/components/forms';
import { product as validations } from '@/constants/validations';
import { fileHelper } from '@/utils/form';

export const useValidation = () => {
	const tErrors = useErrorsTranslation();
	const tLabels = useLabelsTranslation();

	const { name, description, price } = validations;

	const nameArgs = {
		field: tLabels('username'),
		min: name.min,
		max: name.max,
	};
	const descriptionArgs = {
		field: tLabels('description'),
		min: description.min,
		max: description.max,
	};
	const priceArgs = {
		field: tLabels('price'),
		min: price.min,
		max: price.max,
	};
	const imageArgs = { field: tLabels('image') };
	const cadArgs = { field: tLabels('cad') };

	const schema = z.object({
		name: z
			.string()
			.nonempty({ message: tErrors('required', nameArgs) })
			.min(name.min, tErrors('length', nameArgs))
			.max(name.max, tErrors('length', nameArgs)),
		description: z
			.string()
			.nonempty({ message: tErrors('required', descriptionArgs) })
			.min(description.min, tErrors('length', descriptionArgs))
			.max(description.max, tErrors('length', descriptionArgs)),
		price: z
			.number({ message: tErrors('required', priceArgs) })
			.min(price.min, tErrors('range', priceArgs))
			.max(price.max, tErrors('range', priceArgs)),
		categoryId: z.number(),
		image: z
			.instanceof(File, { message: tErrors('required', imageArgs) })
			.refine(fileHelper, tErrors('empty-file', imageArgs)),
		cad: z
			.instanceof(File, { message: tErrors('required', cadArgs) })
			.refine(fileHelper, tErrors('empty-file', cadArgs)),
	});

	return schema;
};
