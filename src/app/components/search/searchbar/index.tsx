import { ChangeEvent, useEffect, useState } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface SearchbarProps {
	placeholder: string;
	getName: () => string | undefined;
	updateName: (searchTerm: string | undefined) => void;
}

const Searchbar = ({ placeholder, getName, updateName }: SearchbarProps) => {
	const [isHovered, setIsHovered] = useState(false);
	const [isPermanentHovered, setIsPermanentHovered] = useState(false);
	const [isFocused, setIsFocused] = useState(false);
	const [showPlaceholder, setShowPlaceholder] = useState(false);

	const nameParam = getName();

	useEffect(() => {
		updateName(nameParam);
	}, [nameParam]);

	const [name, setName] = useState(nameParam ?? '');
	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setName(value);
		updateName(value);
	};

	const isActive = isHovered || isPermanentHovered;

	// Handle placeholder visibility: Show when hovered or focused and input is expanded, hide when focused
	useEffect(() => {
		if (isActive && !name && !isFocused) {
			setShowPlaceholder(true);
		} else {
			setShowPlaceholder(false);
		}
	}, [isActive, name, isFocused]);

	return (
		<div
			onMouseEnter={() => setIsHovered(true)}
			onFocus={() => setIsPermanentHovered(true)}
			onBlur={() => setIsPermanentHovered(false)}
			onMouseLeave={() => !name && setIsHovered(false)}
			className={`relative flex items-center justify-center bg-black text-white border-2 border-purple-900/75 rounded-[15px] shadow-[0_10px_25px_rgba(0,0,0,0.3)] cursor-pointer transition-all duration-[800ms] ease-in-out px-5 py-2.5 w-[30px] ${
				isActive ? 'w-[350px]' : ''
			}`}
		>
			<div className='relative flex-grow'>
				<input
					type='text'
					value={name}
					onChange={handleInput}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					className={`w-0 text-[1.1rem] font-medium text-white transition-[width] duration-[800ms] ease-in-out outline-none bg-transparent border-none ${
						isActive ? 'w-[300px]' : ''
					}`}
				/>
				<span
					className={`absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#9999] text-[1.1rem] font-medium transition-opacity duration-500 ${
						showPlaceholder && !name ? 'opacity-100' : 'opacity-0'
					}`}
				>
					{placeholder}
				</span>
			</div>
			<a
				href='#'
				className={`text-purple-600 text-xl transition-all duration-[400ms] ease-linear ${
					isActive ? 'ml-[15px]' : ''
				} ${isFocused || isHovered ? 'hidden' : ''}`}
			>
				<FontAwesomeIcon className='mr-1' icon={faSearch} />
			</a>
		</div>
	);
};

export default Searchbar;
