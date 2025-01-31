import { useState } from 'react';
import useGetCategories from '@/hooks/queries/categories/useGetCategories';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './categories.module.css';

interface CategoriesProps {
	updateSearch: (categoryId: number) => void;
}

const Categories = ({ updateSearch }: CategoriesProps) => {
	const { data: categories, isLoading, isError } = useGetCategories();

	const [isActiveCategory, setIsActiveCategory] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState('Select Category');

	const toggleDropdown = () => {
		setIsActiveCategory((prev) => !prev);
	};

	const handleInput = (category: string) => {
		setSelectedCategory(category);
		setIsActiveCategory(false);
		const categoryId = categories?.find((c) => c.name === category)?.id;
		updateSearch(categoryId!);
	};

	if (isLoading) {
		return <>Loading</>;
	}

	if (isError || !categories) {
		return <>Error!</>;
	}

	return (
		<div className={`${styles.menu}`}>
			<div
				className={`${styles['select-btn']} ${isActiveCategory ? styles.active : ''}`}
				onClick={toggleDropdown}
			>
				<span className={`${styles.category}`}>{selectedCategory}</span>
				<FontAwesomeIcon icon={faChevronDown} />
			</div>
			<ul className={`${styles.list}`}>
				{categories.map((category) => (
					<li
						key={category.id}
						value={category.id}
						className={`${styles.option}`}
						style={
							{
								'--i': category.id + 1,
							} as React.CSSProperties
						}
						onClick={() => handleInput(category.name)}
					>
						<span className={`${styles.name}`}>
							{category.name}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Categories;
