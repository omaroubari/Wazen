import { GoMegaphone } from 'react-icons/go'
import { getBlockText } from '../../src/utils'

export default {
	name: 'promo-banner',
	title: 'بانر ترويجي',
	icon: GoMegaphone,
	type: 'object',
	fields: [
		{
			name: 'promoTitle',
			title: 'عنوان البانر الترويجي',
			type: 'string',
		},
		{
			name: 'promoDescription',
			title: 'وصف البانر الترويجي',
			type: 'text',
			rows: 4,
		},
		{
			name: 'promoCtas',
			title: 'أزرار البانر الترويجي',
			type: 'array',
			of: [{ type: 'cta' }],
		},
		{
			name: 'promoAdditionalText',
			title: 'النص الإضافي تحت الأزرار',
			type: 'text',
			rows: 3,
		},
		{
			name: 'promoFeatures',
			title: 'قائمة الميزات (القسم الأيسر)',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{
							name: 'text',
							title: 'نص الميزة',
							type: 'text',
							rows: 2,
						},
					],
				},
			],
		},
	],
	preview: {
		select: {
			title: 'promoTitle',
			description: 'promoDescription',
		},
		prepare: ({ title, description }: any) => ({
			title: title || 'بانر ترويجي',
			subtitle: description
				? description.substring(0, 50) + '...'
				: 'بانر ترويجي',
		}),
	},
}
