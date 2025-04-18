import { PagesPublicCart } from '@/locales/types/pages/public';

export default {
	title: 'Вашата Количка',
	by: 'От: {{by}}',
	view: 'Разгледай',
	customize: 'Настрой',
	delivery: 'Доставка',
	'product-price': 'Цена на Продукт - {{price}}',
	'customization-cost': 'Разход от Принтиране - {{cost}}',
	remove: 'Премахни',
	total_zero: 'Няма стока',
	total_one: '{{count}} стока общо - {{cost}}',
	total_other: '{{count}} стоки общо - {{cost}}',
	'total-delivery_zero': 'Няма стока с доставка',
	'total-delivery_one': '{{count}} стока с доставка - {{cost}}',
	'total-delivery_other': '{{count}} стоки с доставка - {{cost}}',
	buy: 'Купи Количка',
} satisfies PagesPublicCart;
