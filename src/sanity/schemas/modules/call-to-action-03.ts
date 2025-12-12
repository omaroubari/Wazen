import { TfiLayoutCtaCenter } from 'react-icons/tfi'
import { getBlockText } from '../../src/utils'

export default {
	name: 'call-to-action-03',
	title: 'Call To Action 03',
	icon: TfiLayoutCtaCenter,
	type: 'object',
	groups: [
		{ name: 'content', title: 'Content', default: true },
		{ name: 'image', title: 'Image' },
		{ name: 'options', title: 'Options' },
	],
	fields: [
		{
			name: 'callToActionDoc',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'call.to.action.doc' }] }],
			group: 'content',
		},
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
			group: 'image',
		},
		{
			name: 'ctas',
			title: 'Call-to-actions',
			type: 'array',
			of: [{ type: 'cta' }],
			group: 'content',
		},
		{
			name: 'microcopy',
			type: 'text',
			group: 'content',
		},
		{
			name: 'checkedList',
			type: 'array',
			of: [{ type: 'block' }],
			group: 'content',
		},
	],
	preview: {
		select: {
			content: 'content',
		},
		prepare: ({ content }: any) => ({
			title: getBlockText(content),
			subtitle: 'Call To Action 03',
		}),
	},
}
