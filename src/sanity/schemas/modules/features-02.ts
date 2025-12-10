import { TfiLayoutCtaCenter } from 'react-icons/tfi'
import { getBlockText, count } from '../../src/utils'

export default {
	name: 'features-02',
	title: 'Features 02',
	icon: TfiLayoutCtaCenter,
	type: 'object',
	fields: [
		{
			name: 'benefits',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{
							name: 'pretitle',
							title: 'Pretitle',
							type: 'string',
						},
						{
							name: 'content',
							title: 'Content',
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
					],
					preview: {
						select: {
							content: 'content',
							subtitle: 'pretitle',
						},
						prepare: ({ content, subtitle }: any) => ({
							title: getBlockText(content),
							subtitle: subtitle,
						}),
					},
				},
			],
		},
	],
	preview: {
		select: {
			benefits: 'benefits',
		},
		prepare: ({ benefits }: any) => ({
			title: count(benefits, 'benefit'),
			subtitle: 'Benefits',
		}),
	},
}
