interface ExtendedArrayOptions<T> {
	advanced?: {
		select?: boolean
	}
}

export default {
	name: 'page',
	title: 'Page',
	type: 'document',
	fields: [
		{
			// should match 'languageField' plugin configuration setting, if customized
			name: 'language',
			type: 'string',
			readOnly: true,
			hidden: true,
		},
		{
			name: 'title',
			type: 'string',
		},
		{
			name: 'modules',
			type: 'array',
			of: [
				{ type: 'applications' },
				{ type: 'app-store-rollup' },
				{ type: 'benefits-banner' },
				{ type: 'blog-rollup' },
				{ type: 'brief' },
				{ type: 'brief-group' },
				{ type: 'home-brief-group' },
				{ type: 'categories-list' },
				{ type: 'help-center-categories-list' },
				{ type: 'contact-us' },
				{ type: 'creative-module' },
				{ type: 'custom-html' },
				{ type: 'faq-list' },
				{ type: 'hero' },
				{ type: 'hero.two' },
				{ type: 'hero.three' },
				{ type: 'hero.four' },
				{ type: 'logo-list' },
				{ type: 'partners' },
				{ type: 'pricing-list' },
				{ type: 'pricing-calculator' },
				{ type: 'pricing-comparison' },
				{ type: 'richtext-module' },
				{ type: 'single-testimony' },
				{ type: 'stat-list' },
				{ type: 'call.to.action' },
				{ type: 'steps' },
				{ type: 'testimonial-list' },
				{ type: 'testimonial-list-two' },
				{ type: 'how-it-works' },
				{ type: 'features-grid' },
				{ type: 'features-grid-2' },
				{ type: 'solutions-benefits' },
				{ type: 'product-list' },
				{ type: 'jobApplicationTabs' },
				{ type: 'crm2' },
			],
			options: {
				advanced: {
					select: true,
				},
			} as ExtendedArrayOptions<unknown>,
		},
		{
			name: 'callToActionDoc',
			title: 'Call To Action Popup',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'call.to.action.doc' }] }],
		},
		{
			name: 'metadata',
			type: 'metadata',
		},
	],
	orderings: [
		{
			name: 'title',
			title: 'Title',
			by: [{ field: 'title', direction: 'asc' }],
		},
		{
			name: 'slug',
			title: 'Link',
			by: [{ field: 'metadata.slug.current', direction: 'asc' }],
		},
	],
	preview: {
		select: {
			title: 'title',
			slug: 'metadata.slug.current',
			media: 'metadata.image',
		},
		prepare: ({ title, slug }: any) => ({
			title,
			subtitle: slug && (slug === 'index' ? '/' : `/${slug}`),
		}),
	},
}
