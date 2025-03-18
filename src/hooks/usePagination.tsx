import { useState } from 'react';

export const usePagination = (total: number, defaultLimit: number) => {
	const [{ page, limit }, setPagination] = useState({
		page: 1,
		limit: defaultLimit,
	});

	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage <= Math.ceil(total / limit)) {
			setPagination({ limit, page: newPage });
		}
	};

	return { page, limit, handlePageChange };
};
