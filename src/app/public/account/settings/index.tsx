import ChooseCurrency from './choose-currency';
import ChooseLanguage from './choose-language';
import TrackViewedProducts from './track-viewed-products';

type SettingsProps = { trackViewedProducts: boolean };
const Settings = ({ trackViewedProducts }: SettingsProps) => (
	<div className='flex flex-col gap-[20px]'>
		<TrackViewedProducts initial={trackViewedProducts} />
		<ChooseLanguage />
		<ChooseCurrency />
	</div>
);

export default Settings;
