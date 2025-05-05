import { useEffect } from 'react';

export default function Gradient() {
	useEffect(() => {
		const style = document.createElement('style');
		style.innerHTML = `
      @keyframes animate {
        0% {
          transform: scale(0) translateY(0) rotate(0);
          opacity: 1;
        }
        100% {
          transform: scale(1.3) translateY(-90px) rotate(360deg);
          opacity: 0;
        }
      }
      
      .box-animate-1 { animation: animate 10s linear infinite; }
      .box-animate-2 { animation: animate 7s linear infinite; }
      .box-animate-3 { animation: animate 9s linear infinite; }
      .box-animate-4 { animation: animate 10s linear infinite; }
      .box-animate-5 { animation: animate 6s linear infinite; }
      .box-animate-6 { animation: animate 12s linear infinite; }
      .box-animate-7 { animation: animate 15s linear infinite; }
      .box-animate-8 { animation: animate 16s linear infinite; }
      .box-animate-9 { animation: animate 9s linear infinite; }
      .box-animate-10 { animation: animate 9s linear infinite; }
      .box-animate-11 { animation: animate 7s linear infinite; }
      .box-animate-12 { animation: animate 13s linear infinite; }
    `;
		document.head.appendChild(style);

		return () => {
			document.head.removeChild(style);
		};
	}, []);

	return (
		<div className='fixed w-full h-full z-[-1] overflow-hidden bg-gradient-to-br from-purple-900/180 via-purple-800/30 to-purple-900/60'>
			<div className='relative w-full h-full'>
				<div className='absolute w-16 h-16 border-6 border-purple-400/40 top-[12%] left-[42%] box-animate-1'></div>
				<div className='absolute w-16 h-16 border-6 border-purple-400/40 top-[70%] left-[50%] box-animate-2'></div>
				<div className='absolute w-16 h-16 border-6 border-purple-400/40 top-[17%] left-[6%] box-animate-3'></div>
				<div className='absolute w-16 h-16 border-6 border-purple-400/40 top-[20%] left-[60%] box-animate-4'></div>
				<div className='absolute w-16 h-16 border-6 border-purple-400/40 top-[67%] left-[10%] box-animate-5'></div>
				<div className='absolute w-16 h-16 border-6 border-purple-400/40 top-[80%] left-[70%] box-animate-6'></div>
				<div className='absolute w-16 h-16 border-6 border-purple-400/40 top-[60%] left-[80%] box-animate-7'></div>
				<div className='absolute w-16 h-16 border-6 border-purple-400/40 top-[32%] left-[25%] box-animate-8'></div>
				<div className='absolute w-16 h-16 border-6 border-purple-400/40 top-[80%] left-[35%] box-animate-9'></div>
				<div className='absolute w-16 h-16 border-6 border-purple-400/40 top-[20%] left-[80%] box-animate-10'></div>
				<div className='absolute w-16 h-16 border-6 border-purple-400/40 top-[46%] left-[90%] box-animate-11'></div>
				<div className='absolute w-16 h-16 border-6 border-purple-400/40 top-[78%] left-[92%] box-animate-12'></div>
			</div>
		</div>
	);
}
