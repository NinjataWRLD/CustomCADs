import { Ref } from 'react';
import ProgressBar from '../progress-bar';

interface ModelProps {
	threejs: {
		ref: Ref<HTMLDivElement>;
		progress: number;
	};
}

const Model = ({ threejs: { ref, progress } }: ModelProps) => {
	return (
		<>
			{progress < 100 && <ProgressBar progress={progress} />}
			<div ref={ref} className='h-full w-full' />
		</>
	);
};

export default Model;
