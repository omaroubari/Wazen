import { TfiLayoutCtaCenter } from 'react-icons/tfi'
import { getBlockText } from '../../src/utils'

export default {
	name: 'call.to.action.doc',
	title: 'Call To Action',
	icon: TfiLayoutCtaCenter,
	type: 'document',

	fields: [
		{
			// should match 'languageField' plugin configuration setting, if customized
			name: 'language',
			type: 'string',
			readOnly: true,
			hidden: true,
		},
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
			title: 'Buttons',
			type: 'array',
			of: [{ type: 'cta' }],
		},
		{
			name: 'microcopy',
			type: 'text',
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
			subtitle: 'Call To Action',
		}),
	},
}
