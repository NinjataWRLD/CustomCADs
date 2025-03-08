import { usePlaceholdersTranslation } from '@/hooks/locales/common/messages';
import { useLabelsTranslation } from '@/hooks/locales/components/forms';
import FieldInfo from '@/app/components/fields/info';
import Password from '@/app/components/fields/password';
import getErrorClass from '@/utils/get-error-class';
import useForm from './useForm';
import styles from '@/styles/forms.module.css';

const useFields = (role: 'Client' | 'Contributor') => {
	const { form, handleSubmit } = useForm(role);
	const tPlaceholders = usePlaceholdersTranslation();
	const tLabels = useLabelsTranslation();

	const FirstNameField = (
		<form.Field name='firstName'>
			{(field) =>
				field.state.value !== undefined && (
					<>
						<label>{tLabels('first-name')}</label>
						<input
							type='text'
							id={field.name}
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							placeholder={tPlaceholders('first-name')}
							className={getErrorClass(field.state.meta.errors)}
						/>
						<FieldInfo
							isValidating={field.state.meta.isValidating}
							isTouched={field.state.meta.isTouched}
							errors={field.state.meta.errors.map(
								(e) => e?.message ?? '',
							)}
						/>
					</>
				)
			}
		</form.Field>
	);
	const LastNameField = (
		<form.Field name='lastName'>
			{(field) =>
				field.state.value !== undefined && (
					<>
						<label>{tLabels('last-name')}</label>
						<input
							type='text'
							id={field.name}
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							placeholder={tPlaceholders('last-name')}
							className={getErrorClass(field.state.meta.errors)}
						/>
						<FieldInfo
							isValidating={field.state.meta.isValidating}
							isTouched={field.state.meta.isTouched}
							errors={field.state.meta.errors.map(
								(e) => e?.message ?? '',
							)}
						/>
					</>
				)
			}
		</form.Field>
	);
	const UsernameField = (
		<form.Field name='username'>
			{(field) =>
				field.state.value !== undefined && (
					<>
						<label>{tLabels('username')}</label>
						<input
							type='text'
							id={field.name}
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							placeholder={tPlaceholders('username')}
							className={getErrorClass(field.state.meta.errors)}
						/>
						<FieldInfo
							isValidating={field.state.meta.isValidating}
							isTouched={field.state.meta.isTouched}
							errors={field.state.meta.errors.map(
								(e) => e?.message ?? '',
							)}
						/>
					</>
				)
			}
		</form.Field>
	);
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
							className={getErrorClass(field.state.meta.errors)}
						/>
						<FieldInfo
							isValidating={field.state.meta.isValidating}
							isTouched={field.state.meta.isTouched}
							errors={field.state.meta.errors.map(
								(e) => e?.message ?? '',
							)}
						/>
					</>
				)
			}
		</form.Field>
	);
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
						<FieldInfo
							isValidating={field.state.meta.isValidating}
							isTouched={field.state.meta.isTouched}
							errors={field.state.meta.errors.map(
								(e) => e?.message ?? '',
							)}
						/>
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
						<FieldInfo
							isValidating={field.state.meta.isValidating}
							isTouched={field.state.meta.isTouched}
							errors={field.state.meta.errors.map(
								(e) => e?.message ?? '',
							)}
						/>
					</>
				)
			}
		</form.Field>
	);

	return {
		handleSubmit,
		FirstNameField,
		LastNameField,
		UsernameField,
		EmailField,
		PasswordField,
		ConfirmPasswordField,
	};
};

export default useFields;
