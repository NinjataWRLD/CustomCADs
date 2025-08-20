import { Ref } from 'react';
import Loader from '../state/loading';

type ModelProps = {
	threejs: {
		ref: Ref<HTMLDivElement>;
		progress: number;
	};
};

const Model = ({ threejs: { ref, progress } }: ModelProps) => {
	return (
		<>
			{progress < 1 && <Loader progress={progress} />}
			<div ref={ref} className='h-full w-full' />
		</>
	);
};

export default Model;
