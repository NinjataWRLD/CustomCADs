import { useEffect } from 'react';

const Loader = () => {
	useEffect(() => {
		const styleEl = document.createElement('style');
		styleEl.textContent = `
      @keyframes loader-animate {
        0% {
          opacity: 0.3;
          transform: scale(0.5) rotate(5deg);
        }
        50% {
          opacity: 1;
          transform: scale(1);
        }
      }
      .loader-square {
        animation: loader-animate 0.6s alternate infinite linear;
      }
      .loader-square:nth-child(1) { animation-delay: 0ms; }
      .loader-square:nth-child(2) { animation-delay: 200ms; }
      .loader-square:nth-child(3) { animation-delay: 300ms; }
      .loader-square:nth-child(4) { animation-delay: 400ms; }
      .loader-square:nth-child(5) { animation-delay: 500ms; }
      .loader-square:nth-child(6) { animation-delay: 600ms; }
    `;
		document.head.appendChild(styleEl);

		return () => {
			document.head.removeChild(styleEl);
		};
	}, []);

	return (
		<div className='w-[70px] aspect-square grid grid-cols-3 gap-[5px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[99]'>
			{[...Array(6)].map((_, index) => (
				<span
					key={index}
					className='loader-square w-full h-full bg-gray-400 border border-gray-800'
				/>
			))}
		</div>
	);
};

export default Loader;
