import { getBlockText } from '../../src/utils'
import { VscSymbolMisc } from 'react-icons/vsc'

export default {
	name: 'logos-01',
	title: 'Logo 01',
	icon: VscSymbolMisc,
	type: 'object',
	fields: [
		{
			name: 'pretitle',
			type: 'string',
		},
		{
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }],
		},
		// {
		// 	name: 'logoType',
		// 	type: 'string',
		// 	options: {
		// 		layout: 'radio',
		// 		list: ['default', 'light', 'dark'],
		// 	},
		// 	initialValue: 'default',
		// }),
		{
			name: 'logos',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'logo' }] }],
			description: 'Leave empty to display all logos',
		},
	],
	preview: {
		select: {
			pretitle: 'pretitle',
			content: 'content',
		},
		prepare: ({ pretitle, content }: any) => ({
			title: pretitle || getBlockText(content),
			subtitle: 'Logo list',
		}),
	},
}
