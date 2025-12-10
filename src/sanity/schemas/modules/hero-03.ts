import { TfiLayoutCtaCenter } from 'react-icons/tfi'
import { getBlockText } from '../../src/utils'

export default {
	name: 'hero-03',
	title: 'Hero 3',
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
		},
		{
			name: 'ctas',
			title: 'Call-to-actions',
			type: 'array',
			of: [{ type: 'cta' }],
		},
	],
	preview: {
		select: {
			content: 'content',
			subtitle: 'subtitle',
		},
		prepare: ({ content, subtitle }: any) => ({
			title: getBlockText(content) || subtitle,
			subtitle: 'Hero 03',
		}),
	},
}
