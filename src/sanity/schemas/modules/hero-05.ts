import { TfiLayoutCtaCenter } from 'react-icons/tfi'
import { getBlockText } from '../../src/utils'
import { group } from 'console'

const textGroup = [
	{
		name: 'title',
		type: 'string',
	},
	{
		name: 'subtitle',
		type: 'string',
	},
]

export default {
	name: 'hero-05',
	title: 'Hero 5 (Enterprise)',
	icon: TfiLayoutCtaCenter,
	type: 'object',
	groups: [
		{ name: 'content', title: 'Content', default: true },
		{ name: 'properties', title: 'Properties' },
	],
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
			name: 'ctas',
			title: 'Call-to-actions',
			type: 'array',
			of: [{ type: 'cta' }],
			group: 'content',
		},
		{
			name: 'properties',
			title: 'Properties',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{
							name: 'label',
							type: 'string',
						},
						{
							name: 'title',
							type: 'string',
						},
						{
							name: 'subtitle',
							type: 'string',
						},
					],
				},
			],
			group: 'properties',
		},
		{
			name: 'list',
			title: 'Trust Statements',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{
							name: 'icon',
							title: 'Icon name',
							type: 'icon',
						},
						...textGroup,
					],
				},
			],
			group: 'content',
		},
	],

	preview: {
		select: { content: 'content', media: 'image.asset' },
		prepare: ({ content, media }: any) => ({
			title: getBlockText(content),
			subtitle: 'Hero 05',
			media,
		}),
	},
}
