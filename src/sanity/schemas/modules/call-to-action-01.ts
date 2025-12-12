import { TfiLayoutCtaCenter } from 'react-icons/tfi'
import { getBlockText } from '../../src/utils'

export default {
	name: 'call-to-action-01',
	title: 'Call To Action 01',
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
			subtitle: 'Call To Action 01',
		}),
	},
}
