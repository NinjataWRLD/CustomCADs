import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Language } from '@/types/locale';
import { setCurrent } from '@/stores/language-store';
import { useLocalesTranslation } from '@/hooks/locales/common/locales';
import { useLanguageStore } from '@/hooks/stores/useLanguageStore';

type FlagProps = {
	lang: Language;
	image: string;
	onChange: (lang: Language) => void;
};
const Flag = ({ lang, image, onChange }: FlagProps) => {
	const store = useLanguageStore();
	const tLocales = useLocalesTranslation();

	const handleChange = () => {
		setCurrent(lang);
		onChange(lang);
	};

	const isActive = store.current === lang;
	return (
		<div
			onClick={handleChange}
			className={clsx(
				'flex items-center px-4 py-3 rounded-lg cursor-pointer transition-colors relative',
				isActive
					? 'bg-blue-50 border border-blue-100'
					: 'hover:bg-gray-100',
			)}
		>
			<img
				src={image}
				width={50}
				height={50}
				loading='lazy'
				className='rounded-full object-cover shadow'
			/>
			<span className='ml-4 text-[1.1rem] text-gray-700 font-medium flex-grow'>
				{tLocales(lang)}
			</span>
			{isActive && (
				<FontAwesomeIcon
					icon={faCheck}
					className='text-blue-500 ml-auto text-sm'
				/>
			)}
		</div>
	);
};

export default Flag;
