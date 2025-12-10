import { TfiLayoutCtaCenter } from 'react-icons/tfi'
import { getBlockText, count } from '../../src/utils'

export default {
	name: 'home-brief-group',
	title: 'Homepage Brief Group',
	icon: TfiLayoutCtaCenter,
	type: 'object',
	fields: [
		{
			name: 'briefs',
			type: 'array',
			of: [{ type: 'brief' }],
		},
	],
	preview: {
		select: {
			title: 'briefs',
		},
		prepare: ({ title }: any) => ({
			title: count(title, 'brief'),
			subtitle: 'Homepage Brief Group',
		}),
	},
}
