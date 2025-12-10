import { VscEdit } from 'react-icons/vsc'
import { getBlockText } from '../../src/utils'

export default {
	name: 'blog-rollup',
	title: 'Blog rollup',
	icon: VscEdit,
	type: 'object',
	fields: [
		{
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }],
		},
		{
			name: 'category',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{ type: 'blog.category' }],
				},
			],
		},
		{
			name: 'layout',
			type: 'string',
			options: {
				list: ['grid', 'carousel'],
				layout: 'radio',
			},
			initialValue: 'carousel',
		},
		{
			name: 'limit',
			type: 'number',
			validation: (rule: any) => rule.min(1).integer(),
		},
	],
	preview: {
		select: {
			content: 'category.0.title',
		},
		prepare: ({ content }: any) => ({
			title: content,
			subtitle: 'Blog Rollup',
		}),
	},
}
