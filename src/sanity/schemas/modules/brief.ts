import { TfiLayoutCtaCenter } from 'react-icons/tfi'
import { getBlockText } from '../../src/utils'

export default {
	name: 'brief',
	title: 'Brief',
	icon: TfiLayoutCtaCenter,
	type: 'object',
	groups: [
		{ name: 'content', title: 'Content', default: true },
		{ name: 'image', title: 'Image' },
		{ name: 'options', title: 'Options' },
	],
	fields: [
		{
			name: 'pretitle',
			type: 'string',
			group: 'content',
		},
		{
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }],
			group: 'content',
		},
		{
			name: 'layout',
			title: 'Layout Options',
			type: 'object',
			fields: [
				{
					name: 'direction',
					type: 'string',
					options: {
						list: [
							{ title: 'Row', value: 'row' },
							{ title: 'Column', value: 'column' },
						],
						layout: 'radio',
						direction: 'horizontal',
					},
					initialValue: 'row',
				},
				{
					name: 'reverse',
					type: 'boolean',
					initialValue: false,
				},
				{
					name: 'textAlign',
					type: 'string',
					options: {
						list: ['start', 'center', 'end'],
						layout: 'radio',
						direction: 'horizontal',
					},
					initialValue: 'start',
				},
			],
			initialValue: {
				direction: 'row',
				reverse: false,
				textAlign: 'start',
			},
			group: 'options',
		},

		// {
		// 	name: 'onRight',
		// 	type: 'boolean',
		// 	initialValue: false,
		// 	group: 'content',
		// },
		{
			name: 'image',
			type: 'image',
			fields: [
				{
					name: 'alt',
					type: 'string',
				},
				{
					name: 'youtubeLink',
					type: 'url',
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
			group: 'image',
		},
	],
	preview: {
		select: {
			content: 'content',
			media: 'image',
		},
		prepare: ({ content, media }: any) => ({
			title: getBlockText(content),
			subtitle: 'Brief',
			media,
		}),
	},
}
