import { AnyFieldApi } from '@tanstack/react-form';
import PhoneInput, { Country } from 'react-phone-number-input';
import Field, { getErrorClass } from '@/app/components/fields';
import 'react-phone-number-input/style.css';

type PhoneNumberFieldProps = {
	api: AnyFieldApi;
	label: string;
	placeholder: string;
	defaultCountry?: Country;
};
const PhoneNumberField = ({
	api,
	label,
	placeholder,
	defaultCountry = 'BG',
}: PhoneNumberFieldProps) => {
	const { meta } = api.state;
	const showError = meta.isBlurred && meta.isTouched;
	const hasError = !!meta.errors.length;

	const baseClassName = `outline-none text-base font-['Ubuntu'] ${getErrorClass(showError && hasError)}`;
	const containerClassName = `w-full p-2.5 border-2
						rounded-[10px] transition-colors duration-300 border-gray-500
						focus:border-purple-500 focus:shadow-white/60
						focus:outline-none focus:ring focus:ring-purple-300`;

	return (
		<Field
			api={api}
			tag='custom'
			label={label}
			field={
				<PhoneInput
					value={api.state.value}
					onChange={(value) => api.handleChange(value ?? '')}
					onBlur={api.handleBlur}
					defaultCountry={defaultCountry}
					placeholder={placeholder}
					className={`${baseClassName} ${containerClassName}`}
					numberInputProps={{
						className: `${baseClassName} border-0`,
					}}
				/>
			}
		/>
	);
};

export default PhoneNumberField;
