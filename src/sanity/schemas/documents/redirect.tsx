import { PiFlowArrow } from 'react-icons/pi'

export default {
	name: 'redirect',
	title: 'Redirect',
	icon: PiFlowArrow,
	type: 'document',
	fields: [
		{
			name: 'source',
			type: 'string',
			placeholder: '/, /blog/:path*, etc',
		},
		{
			name: 'destination',
			type: 'string',
			placeholder: '/, /blog/:path*, etc',
			description: (
				<a
					href="https://nextjs.org/docs/app/api-reference/next-config-js/redirects"
					target="_blank"
					rel="noopener noreferrer"
				>
					Next.js Documentation
				</a>
			),
		},
		{
			name: 'permanent',
			type: 'boolean',
			initialValue: true,
			description:
				'If true will use the 308 status code which instructs clients/search engines to cache the redirect forever, if false will use the 307 status code which is temporary and is not cached.',
		},
	],
	preview: {
		select: {
			title: 'source',
			destination: 'destination',
		},
		prepare: ({ title, destination }: any) => ({
			title,
			subtitle: `to ${destination}`,
		}),
	},
}
