import { GoNumber } from 'react-icons/go'
import { count, getBlockText } from '../../src/utils'

export default {
	name: 'how-it-works',
	title: 'How it works',
	icon: GoNumber,
	type: 'object',
	fields: [
		{
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }],
		},
		{
			name: 'steps',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{
							name: 'image',
							type: 'image',
						},
						{
							name: 'title',
							type: 'string',
						},
						{
							name: 'description',
							type: 'text',
						},
					],
					preview: {
						select: {
							title: 'text',
							subtitle: 'description',
						},
						prepare: ({ title, subtitle }: any) => ({
							title: title,
							subtitle: subtitle,
						}),
					},
				},
			],
			validation: (rule: any) => rule.required().min(3).max(3),
		},
	],
	preview: {
		select: {
			content: 'content',
			steps: 'steps',
		},
		prepare: ({ content, steps }: any) => ({
			title: getBlockText(content),
			subtitle: 'How It Works',
		}),
	},
}
