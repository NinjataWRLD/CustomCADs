import { useStore } from '@tanstack/react-store';
import { useDebounce } from '@/hooks/useDebounce';
import { useCalculateActiveCartShipment } from '@/hooks/queries/active-carts';
import { usePlaceholdersTranslation } from '@/hooks/locales/common/messages';
import { useLabelsTranslation } from '@/hooks/locales/components/forms';
import Field from '@/app/components/fields';
import * as dateTime from '@/utils/date-time';
import { Fields, useForm } from './useForm';

export const useFields = (onSubmit: (values: Fields) => void) => {
	const { form, handleSubmit } = useForm(onSubmit);
	const { country, city, street } = useStore(form.store, ({ values }) => ({
		country: values.country,
		city: values.city,
		street: values.street,
	}));

	const reset = {
		city: () => {
			form.setFieldValue('city', '');
			form.setFieldValue('street', '');
		},
		street: () => form.setFieldValue('street', ''),
	};
	const debounced = useDebounce({ country, city, street }, 250);

	const { data: calculations } = useCalculateActiveCartShipment(
		debounced,
		!!city && !!country && !!street,
	);

	const tPlaceholders = usePlaceholdersTranslation();
	const tLabels = useLabelsTranslation();

	const CountryField = (
		<form.Field name='country' listeners={{ onChange: () => reset.city() }}>
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
		<form.Field name='city' listeners={{ onChange: () => reset.street() }}>
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
	const StreetField = (
		<form.Field name='street'>
			{(api) => (
				<Field
					tag='input'
					api={api}
					label={tLabels('street')}
					type='text'
					placeholder={tPlaceholders('street')}
				/>
			)}
		</form.Field>
	);
	const ServiceField = (
		<form.Field name='service'>
			{(api) => (
				<Field
					tag='select'
					api={api}
					label={tLabels('shipment-service')}
					options={calculations?.map((calculation) => {
						const { service, total, currency, pickupDate } =
							calculation;
						const serviceInfo = `${service} - ${total} ${currency}`;
						const pickUpInfo = `Pick up - ${dateTime.format({ date: pickupDate, dateOnly: true })}`;

						return {
							id: service,
							name: `${serviceInfo}; ${pickUpInfo}`,
							value: service,
						};
					})}
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
		StreetField,
		ServiceField,
		EmailField,
		PhoneField,
		CountField,
	};
};
