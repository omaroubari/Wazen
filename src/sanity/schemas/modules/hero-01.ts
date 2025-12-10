import { TfiLayoutCtaCenter } from 'react-icons/tfi'
import { getBlockText } from '../../src/utils'

export default {
	name: 'hero-01',
	title: 'Hero 1',
	icon: TfiLayoutCtaCenter,
	type: 'object',
	fields: [
		{
			title: 'Pretitle',
			name: 'pretitle',
			type: 'object',
			fields: [
				{ name: 'label', type: 'string' },
				{ name: 'href', type: 'url', title: 'Link' },
			],
			options: {
				collapsible: true,
				collapsed: true,
			},
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
			media: 'image',
		},
		prepare: ({ content, media }: any) => ({
			title: getBlockText(content),
			subtitle: 'Hero 01',
			media,
		}),
	},
}
