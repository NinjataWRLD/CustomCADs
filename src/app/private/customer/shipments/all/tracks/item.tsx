type TrackItemProps = {
	date: string;
	place?: string;
	message: string;
};
const TrackItem = ({ date, place, message }: TrackItemProps) => (
	<div key={date} className='relative w-full'>
		<div className='flex text-center justify-between items-center w-full px-20 py-4 border-y border-purple-500 text-white hover:bg-purple-700/20 rounded-lg transition-all duration-200'>
			<span>{date}</span>
			<span>{place}</span>
			<span>{message}</span>
		</div>
	</div>
);

export default TrackItem;
