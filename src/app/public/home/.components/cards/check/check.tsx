import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const Check = ({ desc }: { desc: string }) => {
	return (
		<li>
			<span className='fa-li'>
				<FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
			</span>
			{desc}
		</li>
	);
};

export default Check;
