import { ValidationContext } from 'sanity'
// import { MediaEditor } from '@catherineriver/sanity-plugin-generate-ogimage'
import { OGImageEditor } from '../../src/OGImageEditor'
import React from 'react'
import { MediaEditor } from '../../plugins/sanity-plugin-generate-og-image/src'

export default {
	name: 'metadata',
	title: 'Metadata',
	type: 'object',
	fields: [
		{
			name: 'title',
			type: 'string',
			validation: (rule: any) => rule.max(60).warning(),
		},
		{
			name: 'description',
			type: 'text',
			rows: 3,
			validation: (rule: any) => rule.max(160).warning(),
		},
		{
			name: 'slug',
			type: 'slug',
			description: 'يرجى اتباع سياق "كلمة-كلمة-كلمة"',
			options: {
				source: (doc: any) => doc.name || doc.title,
				isUnique: isUniqueOtherThanLanguage,
			},
			validation: (rule: any) => rule.required(),
		},
		{
			name: 'image',
			description: 'Used for social sharing previews',
			type: 'image',
			options: {
				sources: [
					{
						name: 'sharing-ogimage',
						title: 'Generate Image',
						component: (props: any) => (
							<MediaEditor {...props} layouts={[OGImageEditor]} />
						),
					},
				],
			},
		},
		{
			name: 'noIndex',
			description: 'Prevent search engines from indexing this page.',
			type: 'boolean',
			initialValue: false,
		},
		{
			name: 'jsonLd',
			title: 'JSON-LD',
			description:
				'Optional structured data objects that will be output as JSON-LD <script> tags. Make sure language is JSON.',
			type: 'code',
			options: {
				language: 'json',
				collapsible: true,
				collapsed: true,
			},
		},
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'description',
		},
	},
}

export async function isUniqueOtherThanLanguage(
	slug: string,
	context: ValidationContext,
) {
	const { document, getClient } = context as any
	if (!document?.language) {
		return true
	}
	const client = getClient({ apiVersion: '2023-04-24' })
	const id = document._id.replace(/^drafts\./, '')
	const params = {
		draft: `drafts.${id}`,
		published: id,
		language: document.language,
		slug,
	}
	const query = `!defined(*[
    !(_id in [$draft, $published]) &&
    slug.current == $slug &&
    language == $language
  ][0]._id)`
	const result = await client.fetch(query, params)
	return result
}
