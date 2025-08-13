import { Ref } from 'react';
import ProgressBar from '../progress-bar';

type ModelProps = {
	threejs: {
		ref: Ref<HTMLDivElement>;
		progress: number;
	};
};

const Model = ({ threejs: { ref, progress } }: ModelProps) => {
	return (
		<>
			{progress < 1 && <ProgressBar progress={progress} />}
			<div ref={ref} className='h-full w-full' />
		</>
	);
};

export default Model;
