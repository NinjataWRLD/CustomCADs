import { ChangeEvent, useEffect, useState } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.module.css';

interface SearchbarProps {
	placeholder: string;
	getName: () => string | undefined;
	updateName: (searchTerm: string | undefined) => void;
}

const Searchbar = ({ placeholder, getName, updateName }: SearchbarProps) => {
	const [isHovered, setIsHovered] = useState(false);
	const [isPermanentHovered, setIsPermanentHovered] = useState(false);

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

	return (
		<div
			onMouseEnter={() => setIsHovered(true)}
			onFocus={() => setIsPermanentHovered(true)}
			onBlur={() => setIsPermanentHovered(false)}
			onMouseLeave={() => !name && setIsHovered(false)}
			className={`${styles.searchbar} ${isPermanentHovered || isHovered ? styles.covered : ''}`}
		>
			<input
				type='text'
				placeholder={placeholder}
				value={name}
				onChange={handleInput}
				className={`${styles.searchbarInput}`}
			/>
			<a href='#'>
				<FontAwesomeIcon icon={faSearch} />
			</a>
		</div>
	);
};

export default Searchbar;
