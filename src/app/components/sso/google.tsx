import { axios } from '@/api/axios';
import google from '@/assets/logos/google.svg';
import { useOthersTranslation } from '@/hooks/locales/common/others';

type SSOGoogleProps = { link: string };
const SSOGoogle = ({ link }: SSOGoogleProps) => {
	const tOthers = useOthersTranslation();

	return (
		<button
			type='button'
			onClick={() =>
				window.location.assign(axios.defaults.baseURL + link)
			}
			className='flex items-center gap-3 px-4 py-2 border border-black rounded-md bg-black text-white text-lg cursor-pointer font-medium shadow-sm hover:shadow-md transition active:translate-y-px'
		>
			<img src={google} alt='Google logo' className='w-6 h-6' />
			<span>{tOthers('google-sso')}</span>
		</button>
	);
};

export default SSOGoogle;
