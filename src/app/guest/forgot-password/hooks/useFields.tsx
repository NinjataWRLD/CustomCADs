import { ValidationError } from '@tanstack/react-form';
import { usePlaceholdersTranslation } from '@/hooks/locales/common/messages';
import { useLabelsTranslation } from '@/hooks/locales/components/forms';
import FieldInfo from '@/app/components/fields/info/info';
import useForm from './useForm';
import styles from '@/styles/forms.module.css';

const useFields = () => {
	const { form, refetch, handleSubmit } = useForm();
	const tPlaceholders = usePlaceholdersTranslation();
	const tLabels = useLabelsTranslation();

	const getClass = (errors: ValidationError[]) =>
		errors ? styles.invalid : '';
	const EmailField = (
		<form.Field name='email'>
			{(field) =>
				field.state.value !== undefined && (
					<>
						<label>{tLabels('email')}</label>
						<input
							type='email'
							id={field.name}
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							placeholder={tPlaceholders('email')}
							className={getClass(field.state.meta.errors)}
						/>
						<FieldInfo meta={field.state.meta} />
					</>
				)
			}
		</form.Field>
	);

	return {
		handleSubmit,
		resendEmail: refetch,
		EmailField,
	};
};

export default useFields;
