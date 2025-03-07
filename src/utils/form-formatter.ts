/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldMeta } from '@tanstack/react-form';
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
