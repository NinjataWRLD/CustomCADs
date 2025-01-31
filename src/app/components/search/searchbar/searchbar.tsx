import { ChangeEvent, useState } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './searchbar.module.css';

interface SearchbarProps {
	updateSearch: (name: string) => void;
}

const Searchbar = ({ updateSearch }: SearchbarProps) => {
	const [searchKeyword, setSearchKeyword] = useState<string>('');
	const [isHovered, setIsHovered] = useState(false);

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setSearchKeyword(value);
		updateSearch(value);
	};

	return (
		<div
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => !searchKeyword && setIsHovered(false)}
			className={`${styles.searchbar} ${isHovered ? styles.covered : ''}`}
		>
			<input
				type='text'
				placeholder='Search for a 3D model'
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
