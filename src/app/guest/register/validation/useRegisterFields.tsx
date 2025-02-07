import { ValidationError } from '@tanstack/react-form';
import { usePlaceholdersTranslation } from '@/hooks/locales/common/messages';
import { useLabelsTranslation } from '@/hooks/locales/components/forms';
import FieldInfo from '@/app/components/fields/info/info';
import Password from '@/app/components/fields/password/password';
import useRegisterForm from './useRegisterForm';
import styles from '@/styles/forms.module.css';

const useRegisterFields = (role: 'Client' | 'Contributor') => {
	const { form } = useRegisterForm(role);
	const tPlaceholders = usePlaceholdersTranslation();
	const tLabels = useLabelsTranslation();

	const getClass = (errors: ValidationError[]) =>
		errors ? styles.invalid : '';

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
							className={getClass(field.state.meta.errors)}
						/>
						<FieldInfo meta={field.state.meta} />
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
							className={getClass(field.state.meta.errors)}
						/>
						<FieldInfo meta={field.state.meta} />
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
							className={getClass(field.state.meta.errors)}
						/>
						<FieldInfo meta={field.state.meta} />
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
							className={getClass(field.state.meta.errors)}
						/>
						<FieldInfo meta={field.state.meta} />
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
		FirstNameField,
		LastNameField,
		UsernameField,
		EmailField,
		PasswordField,
		ConfirmPasswordField,
	};
};

export default useRegisterFields;
