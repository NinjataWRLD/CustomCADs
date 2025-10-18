import { FormEvent, ReactNode, useState } from 'react';
import Button from '../button';

type MultiStepFormProps = {
	steps: { form: ReactNode; validate?: () => Promise<boolean> | boolean }[];
	text?: { back: string; next: string; submit: string };
	onSubmit: (e: FormEvent<HTMLButtonElement>) => void;
};
const MultiStepForm = (props: MultiStepFormProps) => {
	const [current, setCurrent] = useState(0);
	const { form, validate } = props.steps[current];

	const first = 0;
	const last = props.steps.length - 1;

	const prev = () => setCurrent((i) => Math.max(i - 1, first));
	const next = async () =>
		!(validate && !(await validate())) &&
		setCurrent((i) => Math.min(i + 1, last));

	const isFirst = current > first;
	const isLast = current === last;

	const text = props.text ?? {
		back: 'Back',
		next: 'Next',
		submit: 'Submit',
	};

	return (
		<div className='h-[100dvh] flex flex-col justify-center items-center gap-8 text-white'>
			{form}

			<div className='flex gap-12'>
				{isFirst && (
					<Button type='button' text={text.back} onClick={prev} />
				)}
				{!isLast ? (
					<Button type='button' text={text.next} onClick={next} />
				) : (
					<Button
						type='submit'
						text={text.submit}
						onClick={props.onSubmit}
					/>
				)}
			</div>
		</div>
	);
};

export default MultiStepForm;
