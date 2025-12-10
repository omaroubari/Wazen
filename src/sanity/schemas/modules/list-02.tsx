import { GoNumber } from 'react-icons/go'
import { count, getBlockText } from '../../src/utils'

export default {
	name: 'list-02',
	title: 'List 02',
	icon: GoNumber,
	type: 'object',
	groups: [{ name: 'content', title: 'Content' }, { name: 'features' }],

	fields: [
		{
			name: 'pretitle',
			title: 'Pretitle',
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
			name: 'ctas',
			title: 'Call-to-actions',
			type: 'array',
			of: [{ type: 'cta' }],
			group: 'content',
		},
		{
			name: 'features',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{
							name: 'icon',
							title: 'Icon (Phosphor icons',
							description: `Go to https://phosphoricons.com/ and find the icon of your choice. Copy it's name and paste it here to look it up.`,
							type: 'icon',
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
							feature: 'title',
							description: 'description',
							icon: 'icon',
						},
						prepare: ({ feature, description, icon }: any) => ({
							title: feature,
							subtitle: description,
						}),
					},
				},
			],
			validation: (rule: any) => rule.required().min(3).max(6),
			group: 'features',
		},
	],
	preview: {
		select: {
			content: 'content',
			features: 'features',
		},
		prepare: ({ content, features }: any) => ({
			title: getBlockText(content) || count(features, 'feature'),
			subtitle: 'List 02',
		}),
	},
}
