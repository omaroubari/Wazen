import { TfiLayoutCtaCenter } from 'react-icons/tfi'
import { getBlockText } from '../../src/utils'

export default {
	name: 'testimonials-03',
	title: 'Testimonials 03',
	icon: TfiLayoutCtaCenter,
	type: 'object',
	groups: [
		{ name: 'content', title: 'Content', default: true },
		{ name: 'options', title: 'Options' },
		{ name: 'image', title: 'Image' },
	],
	fieldsets: [
		{ name: 'image', title: 'Image', options: { columns: 2 } },
		{ name: 'alignment', title: 'Alignment', options: { columns: 2 } },
	],
	fields: [
		{
			name: 'logoImage',
			type: 'image',
			fields: [
				{
					name: 'alt',
					type: 'string',
				},
			],
			group: 'content',
		},
		{
			name: 'testimony',
			type: 'array',
			of: [{ type: 'block' }],
			group: 'content',
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
			group: 'content',
		},
		{
			name: 'client',
			type: 'array',
			of: [{ type: 'block' }],
			group: 'content',
		},
		{
			name: 'position',
			type: 'array',
			of: [{ type: 'block' }],
			group: 'content',
		},
		{
			name: 'textAlign',
			type: 'string',
			options: {
				layout: 'radio',
				list: ['left', 'center', 'right'],
			},
			initialValue: 'center',
			group: 'options',
			fieldset: 'alignment',
		},
		{
			name: 'alignItems',
			title: 'Vertical alignment',
			type: 'string',
			options: {
				layout: 'radio',
				list: [
					{ title: 'Top', value: 'start' },
					'center',
					{ title: 'Bottom', value: 'end' },
				],
			},
			initialValue: 'center',
			group: 'options',
			fieldset: 'alignment',
		},
	],
	preview: {
		select: {
			content: 'mainTitle',
			media: 'image',
		},
		prepare: ({ content, media }: any) => ({
			title: getBlockText(content),
			subtitle: 'Single Testimony',
			media,
		}),
	},
}
