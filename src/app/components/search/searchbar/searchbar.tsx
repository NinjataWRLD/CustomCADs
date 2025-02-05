import { ChangeEvent, useState } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './searchbar.module.css';

interface SearchbarProps {
	placeholder: string;
	updateSearch: (name: string) => void;
}

const Searchbar = ({ placeholder, updateSearch }: SearchbarProps) => {
	const [searchKeyword, setSearchKeyword] = useState('');
	const [isHovered, setIsHovered] = useState(false);
	const [isPermanentHovered, setIsPermanentHovered] = useState(false);

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setSearchKeyword(value);
		updateSearch(value);
	};

	return (
		<div
			onMouseEnter={() => setIsHovered(true)}
			onFocus={() => setIsPermanentHovered(true)}
			onBlur={() => setIsPermanentHovered(false)}
			onMouseLeave={() => !searchKeyword && setIsHovered(false)}
			className={`${styles.searchbar} ${isPermanentHovered || isHovered ? styles.covered : ''}`}
		>
			<input
				type='text'
				placeholder={placeholder}
				value={searchKeyword}
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
