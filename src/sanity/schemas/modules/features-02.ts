import { TfiLayoutCtaCenter } from 'react-icons/tfi'
import { getBlockText, count } from '../../src/utils'

export default {
	name: 'features-02',
	title: 'Features 02',
	icon: TfiLayoutCtaCenter,
	type: 'object',
	fields: [
		{
			name: 'features',
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
			features: 'features',
		},
		prepare: ({ features }: any) => ({
			title: count(features, 'features'),
			subtitle: 'Features 02',
		}),
	},
}
