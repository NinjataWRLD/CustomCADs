import React, { useEffect, useState } from 'react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLabelsTranslation } from '@/hooks/locales/components/forms';

interface Option {
	id: string | number;
	name: string;
	value: string;
}

interface StyledSelectProps {
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
}

const StyledSelect = ({
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
}: StyledSelectProps) => {
	const tSelect = useLabelsTranslation();
	const defaultPlaceholder = tSelect('select-option');

	const [isActive, setIsActive] = useState(false);
	const [selectedOption, setSelectedOption] = useState<string | undefined>(
		value,
	);
	const [parsedOptions, setParsedOptions] = useState<Option[]>([]);

	placeholder = placeholder || defaultPlaceholder;

	useEffect(() => {
		if (!Array.isArray(options)) {
			const optionsArray: Option[] = [];
			if (options && typeof options === 'object') {
				React.Children.forEach(options as React.ReactNode, (child) => {
					if (React.isValidElement(child)) {
						const props = child.props as any;
						if (props) {
							optionsArray.push({
								id: props.value || props.children,
								name: props.children,
								value: props.value || props.children,
							});
						}
					}
				});
			}
			setParsedOptions(optionsArray);
		} else {
			setParsedOptions(options);
		}
	}, [options]);

	useEffect(() => {
		setSelectedOption(value);
	}, [value]);

	const toggleDropdown = () => {
		if (!disabled) {
			setIsActive(!isActive);
		}
	};

	const handleSelect = (option: Option) => {
		setSelectedOption(option.name);
		onChange(option.value);
		setIsActive(false);
	};

	const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
		setTimeout(() => setIsActive(false), 200);
		if (onBlur) {
			onBlur(e);
		}
	};

	const displayValue = selectedOption || placeholder;

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
					{displayValue}
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
						value={option.value}
						className={`flex items-center justify-center text-center w-full bg-black border-r-2 border-l-2 border-purple-900 border-b-2 border-b-dashed border-b-purple-400/40 py-2 px-1 cursor-pointer transition-all duration-500 hover:bg-purple-900/80 ${
							isActive
								? 'opacity-100 scale-100 translate-y-0 mb-0'
								: 'opacity-0 scale-0 -translate-y-16 -mb-10'
						}`}
						style={{ transitionDelay: `${index * 0.1}s` }}
						onClick={() => handleSelect(option)}
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
