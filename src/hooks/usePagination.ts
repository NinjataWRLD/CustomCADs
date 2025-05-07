import { useState } from 'react';

export const usePagination = (
	total: number,
	defaultLimit: number,
	autoLoop?: boolean,
) => {
	const [{ page, limit }, setPagination] = useState({
		page: 1,
		limit: defaultLimit,
	});

	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage <= Math.ceil(total / limit)) {
			setPagination({ limit, page: newPage });
		} else if (autoLoop) {
			if (newPage < 1) {
				setPagination({ limit, page: Math.ceil(total / limit) });
			} else {
				setPagination({ limit, page: 1 });
			}
		}
	};

	return { page, limit, handlePageChange };
};
