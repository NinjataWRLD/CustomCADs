import { ChangeEvent, useState } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useSearchParams from '@/hooks/useSearchParams';
import styles from './styles.module.css';

interface SearchbarProps {
	placeholder: string;
	updateSearch: (name?: string) => void;
}

const Searchbar = ({ placeholder, updateSearch }: SearchbarProps) => {
	const { getParam, setParams } = useSearchParams();
	const nameParam = getParam('name');

	const [name, setName] = useState(nameParam ?? '');
	const [isHovered, setIsHovered] = useState(false);
	const [isPermanentHovered, setIsPermanentHovered] = useState(false);

	const setNameParam = (name: string) =>
		setParams({
			name: encodeURIComponent(name),
		});

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setName(value);
		setNameParam(value);
		updateSearch(value);
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
