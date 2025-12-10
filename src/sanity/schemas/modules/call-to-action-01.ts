import { TfiLayoutCtaCenter } from 'react-icons/tfi'
import { getBlockText } from '../../src/utils'

export default {
	name: 'call-to-action-01',
	title: 'Call To Action 01',

	icon: TfiLayoutCtaCenter,
	type: 'object',

	fields: [
		{
			name: 'callToActionDoc',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'call.to.action.doc' }] }],
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
		{
			name: 'checkedList',
			type: 'array',
			of: [{ type: 'block' }],
		},
	],
	preview: {
		select: {
			content: 'content',
		},
		prepare: ({ content }: any) => ({
			title: getBlockText(content),
			subtitle: 'Call to action',
		}),
	},
}
