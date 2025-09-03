import { CURRENCIES, Currency } from '@/types/locale';
import * as currencyStore from '@/stores/currency-store';
import { useMyAccountTranslation } from '@/hooks/locales/pages/public';
import { useCurrencyStore } from '@/hooks/stores/useCurrencyStore';
import StyledSelect from '@/app/components/fields/select';

const ChooseCurrency = () => {
	const tMyAccount = useMyAccountTranslation();
	const options = CURRENCIES.map((c) => ({ id: c, name: c, value: c }));

	const currency = useCurrencyStore();
	const handleChange = (value: Currency) => {
		currencyStore.setCurrent(value);
	};

	return (
		<div className='relative flex items-center gap-8'>
			<h2>{tMyAccount('choose-currency')}</h2>
			<StyledSelect
				id='language'
				name='language'
				value={currency.current}
				options={options}
				onChange={handleChange}
				className='max-w-[40%]'
			/>
		</div>
	);
};

export default ChooseCurrency;
