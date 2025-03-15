/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldMeta, ValidationError } from '@tanstack/react-form';
import styles from '@/styles/forms.module.css';

type Meta = FieldMeta<
	any,
	any,
	any,
	any,
	any,
	any,
	any,
	any,
	any,
	any,
	any,
	any,
	any,
	any,
	any,
	any,
	any
>;

export const formatMeta = (meta: Meta) =>
	({
		...meta,
		errors: meta.errors.map((e) => e?.message ?? ''),
	}) as Meta;

export const fieldEqualityHelper = () => {
	let holder = '';

	const sync = (x: string) => {
		holder = x;
		return true;
	};

	const check = (x: string) => {
		return holder === x;
	};

	return { sync, check };
};

export const getErrorClass = (errors: ValidationError[]) =>
	errors ? styles.invalid : '';
