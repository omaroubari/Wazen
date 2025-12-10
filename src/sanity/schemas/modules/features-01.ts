import { TfiLayoutCtaCenter } from 'react-icons/tfi'
import { count, getBlockText } from '../../src/utils'

interface ExtendedArrayOptions<T> {
	advanced?: {
		select?: boolean
	}
}

export default {
	name: 'features-01',
	title: 'Features 01',
	icon: TfiLayoutCtaCenter,
	type: 'object',
	groups: [{ name: 'content', title: 'Content' }, { name: 'features' }],
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
			name: 'features',
			type: 'array',
			of: [
				{
					name: 'grid',
					type: 'object',
					fields: [
						{
							name: 'features',
							type: 'array',
							of: [
								{
									name: 'feature',
									type: 'object',
									fields: [
										{
											name: 'icon',
											title: 'Icon name',
											type: 'icon',
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
							options: {
								advanced: { select: true },
							} as ExtendedArrayOptions<unknown>,
							validation: (rule: any) => rule.required().min(1).max(4),
						},
					],
					preview: {
						select: { feature: 'features' },
						prepare: ({ feature }: any) => ({
							title: count(feature, 'feature'),
						}),
					},
				},
			],
			group: 'features',
			options: {
				advanced: {
					select: true,
				},
			} as ExtendedArrayOptions<unknown>,
		},
	],
	preview: {
		select: {
			content: 'content',
			features: 'features',
		},
		prepare: ({ content, features }: any) => ({
			title: getBlockText(content) || count(features, 'feature'),
			subtitle: 'Features grid two',
		}),
	},
}
