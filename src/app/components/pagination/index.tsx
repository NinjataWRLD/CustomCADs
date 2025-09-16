import { usePagination } from '@/hooks/usePagination';
import Button from './button';
import Num from './num';
import { useEffect } from 'react';

type PaginationProps = {
	total: number;
	defaultLimit: number;
	navigate: (pagination: { page: number; limit: number }) => void;
};

const Pagination = ({ total, defaultLimit, navigate }: PaginationProps) => {
	if (!total) return;

	const { page, limit, handlePageChange } = usePagination(
		total,
		defaultLimit,
	);
	const lastPage = Math.ceil(total / limit);

	useEffect(() => {
		navigate({ page, limit });
	}, [page, limit]);

	const handle = {
		beginning: () => handlePageChange(1),
		previous: () => handlePageChange(page - 1),
		next: () => handlePageChange(page + 1),
		end: () => handlePageChange(lastPage),
	};

	const renderNums = () => {
		const nums = [];
		for (let i = 1; i <= lastPage; i++) {
			nums.push(
				<Num
					key={i}
					num={i}
					handleClick={handlePageChange}
					active={i === page}
				/>,
			);
		}
		return nums;
	};

	return (
		<div className='flex justify-center items-center gap-4'>
			<Button
				direction='prev'
				disabled={page === 1}
				handleClick={handle.beginning}
				duplicate
			/>
			<Button
				direction='prev'
				disabled={page === 1}
				handleClick={handle.previous}
			/>
			{renderNums()}
			<Button
				direction='next'
				disabled={page === lastPage}
				handleClick={handle.next}
			/>
			<Button
				direction='next'
				disabled={page === lastPage}
				handleClick={handle.end}
				duplicate
			/>
		</div>
	);
};

export default Pagination;
