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
				{ type: 'blog-rollup' },
				{ type: 'brief' },
				{ type: 'brief-group' },
				{ type: 'call-to-action-01' },
				{ type: 'call-to-action-02' },
				{ type: 'categories-list' },
				{ type: 'contact-us' },
				{ type: 'custom-html' },
				{ type: 'faq-list' },
				{ type: 'features-01' },
				{ type: 'features-02' },
				{ type: 'help-center-categories-list' },
				{ type: 'hero-01' },
				{ type: 'hero-02' },
				{ type: 'hero-03' },
				{ type: 'hero-04' },
				{ type: 'home-brief-group' },
				{ type: 'how-it-works' },
				// { type: 'creative-module' },
				{ type: 'list-01' },
				{ type: 'list-02' },
				{ type: 'logos-01' },
				{ type: 'logos-02' },
				{ type: 'pricing-list' },
				{ type: 'pricing-calculator' },
				{ type: 'pricing-comparison' },
				{ type: 'product-list' },
				{ type: 'richtext-module' },
				{ type: 'stat-list' },
				{ type: 'steps' },
				// { type: 'single-testimony' },
				{ type: 'testimonials-01' },
				{ type: 'testimonials-02' },
				{ type: 'jobApplicationTabs' },
				{ type: 'crm2' },
				{ type: 'partners-program' },
				{ type: 'subscribe' },
				{ type: 'promo-banner' },
			],
			options: {
				insertMenu: {
					groups: [
						{
							name: 'hero',
							of: ['hero-01', 'hero-02', 'hero-03', 'hero-04'],
						},
						{
							name: 'Content',
							of: [
								'brief',
								'brief-group',
								'home-brief-group',
								'features-01',
								'features-02',
								'how-it-works',
							],
						},
						{ name: 'CTA', of: ['call-to-action-01', 'call-to-action-02'] },
						{
							name: 'blog',
							of: [
								'blog-rollup',
								'categories-list',
								'help-center-categories-list',
							],
						},
						{
							name: 'pricing',
							of: ['pricing-calculator', 'pricing-comparison'],
						},
						{
							name: 'Social Proof',
							of: [
								'logos-01',
								'logos-02',
								'testimonials-01',
								'testimonials-02',
							],
						},
					],
				},
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
