import { Ref } from 'react';

interface ModelProps {
	threejs: {
		ref: Ref<HTMLDivElement>;
		progress: number;
	};
}

const Model = ({ threejs: { ref, progress } }: ModelProps) => {
	return (
		<>
			{progress < 100 && `${progress}%`}
			<div ref={ref} className='h-full w-full' />
		</>
	);
};

export default Model;
