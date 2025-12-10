import { TfiLayoutCtaCenter } from 'react-icons/tfi'
import { getBlockText } from '../../src/utils'

export default {
	name: 'hero.four',
	title: 'Hero 4',
	icon: TfiLayoutCtaCenter,
	type: 'object',
	fields: [
		{
			name: 'pretitle',
			type: 'string',
		},
		{
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }],
		},
		{
			name: 'ctas',
			title: 'Call-to-actions',
			type: 'array',
			of: [{ type: 'cta' }],
		},
		{
			name: 'image',
			type: 'image',
			fields: [
				{
					name: 'alt',
					type: 'string',
				},
				{
					name: 'onRight',
					type: 'boolean',
					initialValue: false,
				},
				{
					name: 'loading',
					type: 'string',
					options: {
						layout: 'radio',
						list: ['lazy', 'eager'],
					},
					initialValue: 'lazy',
				},
			],
			validation: (rule: any) => rule.required(),
		},
	],

	preview: {
		select: { content: 'content', media: 'image.asset' },
		prepare: ({ content, media }: any) => ({
			title: getBlockText(content),
			subtitle: 'Hero four',
			media,
		}),
	},
}
