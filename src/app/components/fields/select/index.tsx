import React, { useMemo, useState } from 'react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLabelsTranslation } from '@/hooks/locales/components/forms';

type Option = {
	id: string | number;
	name: string;
	value: string;
};
type StyledSelectProps = {
	id?: string;
	name?: string;
	value?: string;
	onChange: (value: string) => void;
	onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
	className?: string;
	options: Option[] | React.ReactNode;
	placeholder?: string;
	hasError?: boolean;
	disabled?: boolean;
};

const StyledSelect: React.FC<StyledSelectProps> = ({
	id,
	name,
	value,
	onChange,
	onBlur,
	className = '',
	options,
	placeholder,
	hasError = false,
	disabled = false,
}) => {
	const tSelect = useLabelsTranslation();
	const defaultPlaceholder = tSelect('select-option');
	const [isActive, setIsActive] = useState(false);

	const parsedOptions: Option[] = useMemo(() => {
		if (Array.isArray(options)) return options;

		const childrenOptions: Option[] = [];
		if (options && typeof options === 'object') {
			React.Children.forEach(options, (child) => {
				if (React.isValidElement(child)) {
					const element = child as React.ReactElement<{
						value?: string | number;
						children: React.ReactNode;
					}>;
					const { value: val, children: label } = element.props;

					const fallback =
						typeof label === 'string' || typeof label === 'number'
							? label.toString()
							: 'unknown';

					const id = (val ?? fallback).toString();
					const value = (val ?? fallback).toString();
					const name = typeof label === 'string' ? label : fallback;

					childrenOptions.push({ id, value, name });
				}
			});
		}
		return childrenOptions;
	}, [options]);

	const selectedDisplay = useMemo(() => {
		const match = parsedOptions.find((opt) => opt.value === value);
		return match?.name ?? placeholder ?? defaultPlaceholder;
	}, [value, parsedOptions, placeholder, defaultPlaceholder]);

	const toggleDropdown = () => {
		if (!disabled) setIsActive((prev) => !prev);
	};

	const handleSelect = (option: Option) => {
		onChange(option.value);
		setIsActive(false);
	};

	const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
		setTimeout(() => setIsActive(false), 200);
		onBlur?.(e);
	};

	return (
		<div
			className={`relative w-full z-40 ${className}`}
			onBlur={handleBlur}
			tabIndex={0}
		>
			<div
				id={id}
				data-name={name}
				className={`relative flex justify-between items-center p-4 bg-black text-white border-2 transition-all duration-500 ${
					hasError ? 'border-red-500' : 'border-purple-900/75'
				} rounded-2xl shadow-md shadow-purple-900/20 cursor-pointer ${
					disabled ? 'opacity-60 cursor-not-allowed' : ''
				} ${isActive ? 'active' : ''}`}
				onClick={toggleDropdown}
			>
				<span className='ml-[5%] text-base font-normal drop-shadow-[1px_1px_2px_white,_2px_2px_1px_rgb(128,0,128)]'>
					{selectedDisplay}
				</span>
				<FontAwesomeIcon
					icon={faChevronDown}
					className={`text-sm mr-2.5 transition-transform duration-1000 ${
						isActive ? 'rotate-180' : ''
					}`}
				/>
			</div>

			<ul className='absolute w-[90%] right-[7%] -translate-y-1.5'>
				{parsedOptions.map((option, index) => (
					<li
						key={option.id}
						onClick={() => handleSelect(option)}
						className={`flex items-center justify-center text-center w-full bg-black border-r-2 border-l-2 border-purple-900 border-b-2 border-b-dashed border-b-purple-400/40 py-2 px-1 cursor-pointer transition-all duration-500 hover:bg-purple-900/80 ${
							isActive
								? 'opacity-100 scale-100 translate-y-0 mb-0'
								: 'opacity-0 scale-0 -translate-y-16 -mb-10'
						}`}
						style={{ transitionDelay: `${index * 0.1}s` }}
					>
						<span className='text-lg text-gray-400 hover:text-purple-300 transition-colors duration-300 font-medium w-full px-2'>
							{option.name}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default StyledSelect;
