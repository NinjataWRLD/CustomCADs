import { usePlaceholdersTranslation } from '@/hooks/locales/common/messages';
import { useLabelsTranslation } from '@/hooks/locales/components/forms';
import Password from '@/app/components/fields/password';
import FieldInfo from '@/app/components/fields/info';
import useForm from './useForm';
import styles from '@/styles/forms.module.css';

const useFields = (email: string, token: string) => {
	const { form, handleSubmit } = useForm(email, token);
	const tPlaceholders = usePlaceholdersTranslation();
	const tLabels = useLabelsTranslation();

	const PasswordField = (
		<form.Field name='password'>
			{(field) =>
				field.state.value !== undefined && (
					<>
						<label>{tLabels('password')}</label>
						<div className={styles['password-wrapper']}>
							<Password
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) =>
									field.handleChange(e.target.value)
								}
								placeholder={tPlaceholders('password')}
								errors={field.state.meta.errors}
							/>
						</div>
						<FieldInfo meta={field.state.meta} />
					</>
				)
			}
		</form.Field>
	);
	const ConfirmPasswordField = (
		<form.Field name='confirmPassword'>
			{(field) =>
				field.state.value !== undefined && (
					<>
						<label>{tLabels('confirm-password')}</label>
						<div className={styles['password-wrapper']}>
							<Password
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) =>
									field.handleChange(e.target.value)
								}
								placeholder={tPlaceholders('confirm-password')}
								errors={field.state.meta.errors}
							/>
						</div>
						<FieldInfo meta={field.state.meta} />
					</>
				)
			}
		</form.Field>
	);

	return {
		handleSubmit,
		PasswordField,
		ConfirmPasswordField,
	};
};

export default useFields;
