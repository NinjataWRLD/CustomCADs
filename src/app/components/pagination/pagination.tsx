import Button from './buttons/button';
import Num from './buttons/num';
import styles from './pagination.module.css';

interface PaginationProps {
	total: number;
	limit: number;
	page: number;
	onPageChange: (newPage: number) => void;
}

const Pagination = ({ total, limit, page, onPageChange }: PaginationProps) => {
	const lastPage = Math.ceil(total / limit);

	const handleBeginning = () => {
		onPageChange(1);
	};
	const handlePrevious = () => {
		onPageChange(page - 1);
	};
	const handleNext = () => {
		onPageChange(page + 1);
	};
	const handleEnd = () => {
		onPageChange(lastPage);
	};

	const renderNums = () => {
		const nums = [];
		for (let i = 1; i <= lastPage; i++) {
			nums.push(
				<Num
					key={i}
					num={i}
					handleClick={onPageChange}
					active={i === page}
				/>,
			);
		}
		return nums;
	};

	return (
		<div className={styles.paginationContainer}>
			<Button
				direction='prev'
				disabled={page === 1}
				handleClick={handleBeginning}
				duplicate
			/>
			<Button
				direction='prev'
				disabled={page === 1}
				handleClick={handlePrevious}
			/>
			{renderNums()}
			<Button
				direction='next'
				disabled={page === lastPage}
				handleClick={handleNext}
			/>
			<Button
				direction='next'
				disabled={page === lastPage}
				handleClick={handleEnd}
				duplicate
			/>
		</div>
	);
};

export default Pagination;
