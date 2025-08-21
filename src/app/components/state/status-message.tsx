import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCheckCircle,
	faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';

type StateInfo = { show: boolean; message: string };

type StatusMessageProps = { success: StateInfo; failure: StateInfo };
const StatusMessage = ({ success, failure }: StatusMessageProps) => (
	<div className='min-h-[3rem] flex items-center justify-center'>
		{success.show && (
			<div className='flex items-center space-x-2 text-green-400 bg-green-500/10 px-4 py-2 rounded-lg border border-green-500/20'>
				<FontAwesomeIcon icon={faCheckCircle} className='text-sm' />
				<span>{success.message}</span>
			</div>
		)}
		{failure.show && (
			<div className='flex items-center space-x-2 text-red-400 bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/20'>
				<FontAwesomeIcon
					icon={faExclamationTriangle}
					className='text-sm'
				/>
				<span>{failure.message}</span>
			</div>
		)}
	</div>
);

export default StatusMessage;
