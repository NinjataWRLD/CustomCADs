import { usePlaceholdersTranslation } from '@/hooks/locales/common/messages';
import { useLabelsTranslation } from '@/hooks/locales/components/forms';
import Field from '@/app/components/fields';
import { Fields, useForm } from './useForm';

export const useFields = (onSubmit: (values: Fields) => void) => {
	const { form, handleSubmit } = useForm(onSubmit);
	const tPlaceholders = usePlaceholdersTranslation();
	const tLabels = useLabelsTranslation();

	const CountryField = (
		<form.Field name='country'>
			{(api) => (
				<Field
					tag='input'
					api={api}
					label={tLabels('country')}
					type='text'
					placeholder={tPlaceholders('country')}
				/>
			)}
		</form.Field>
	);
	const CityField = (
		<form.Field name='city'>
			{(api) => (
				<Field
					tag='input'
					api={api}
					label={tLabels('city')}
					type='text'
					placeholder={tPlaceholders('city')}
				/>
			)}
		</form.Field>
	);
	const EmailField = (
		<form.Field name='email'>
			{(api) => (
				<Field
					tag='input'
					api={api}
					label={tLabels('email')}
					type='email'
					placeholder={tPlaceholders('email')}
				/>
			)}
		</form.Field>
	);
	const PhoneField = (
		<form.Field name='phone'>
			{(api) => (
				<Field
					tag='input'
					api={api}
					label={tLabels('phone')}
					type='text'
					placeholder={tPlaceholders('phone')}
				/>
			)}
		</form.Field>
	);
	const CountField = (
		<form.Field name='count'>
			{(api) => (
				<Field
					tag='input'
					api={api}
					label={tLabels('count')}
					type='number'
					format={(value) => Number(value)}
				/>
			)}
		</form.Field>
	);

	return {
		handleSubmit,
		CountryField,
		CityField,
		EmailField,
		PhoneField,
		CountField,
	};
};
