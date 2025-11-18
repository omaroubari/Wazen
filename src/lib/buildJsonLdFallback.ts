const schemaTypeByDocument: Record<string, string> = {
	'blog.post': 'BlogPosting',
	'blog.post.en': 'BlogPosting',
	'help.center.post': 'Article',
	'help.center.post.en': 'Article',
	'app.store.app': 'SoftwareApplication',
}

type JsonLdSource =
	| (Sanity.PageBase & {
			publishDate?: string
			language?: string
		})
	| (Sanity.BlogPost & {
			publishDate?: string
		})
	| (Sanity.HelpCenterPost & {
			publishDate?: string
		})
	| (Sanity.Metadata & { _type?: string })
	| null
	| undefined

export type JsonLdFallbackOptions = {
	locale?: string
	/** Optional path (e.g. `/blog/page/2`) that will override slug-derived URLs. */
	path?: string
	/** Optional absolute URL override. */
	url?: string
}

/**
 * Builds a very small WebPage/Article/SoftwareApplication JSON-LD object, which is
 * useful when editors forget to provide a custom JSON-LD definition in Sanity.
 */
export function buildJsonLdFallback(
	source?: JsonLdSource,
	options: JsonLdFallbackOptions = {},
) {
	const metadata = getMetadata(source)
	if (!metadata?.title && !metadata?.description) {
		return undefined
	}

	const url = buildCanonicalUrl(source, options)
	if (!url) {
		return undefined
	}

	const schemaType = getSchemaType(source)
	const fallback: Record<string, unknown> = removeEmpty({
		'@context': 'https://schema.org',
		'@type': schemaType,
		name: metadata?.title,
		description: metadata?.description,
		url,
		inLanguage: options.locale || (source as any)?.language,
		image: metadata?.ogimage,
		datePublished: getPublishDate(source),
		dateModified: getDateModified(source),
	})

	return Object.keys(fallback).length > 0 ? [fallback] : undefined
}

function getMetadata(source?: JsonLdSource) {
	if (!source) {
		return undefined
	}

	if ('metadata' in source) {
		return source.metadata as Sanity.Metadata
	}

	return source as unknown as Sanity.Metadata
}

function getSchemaType(source?: JsonLdSource) {
	const type = (source as any)?._type
	return schemaTypeByDocument[type as string] || 'WebPage'
}

function getPublishDate(source?: JsonLdSource) {
	if (source && 'publishDate' in (source as any)) {
		return (source as any).publishDate
	}
	return undefined
}

function getDateModified(source?: JsonLdSource) {
	if (source && '_updatedAt' in (source as any)) {
		return (source as any)._updatedAt
	}
	return undefined
}

function buildCanonicalUrl(source: JsonLdSource, options: JsonLdFallbackOptions) {
	if (options.url) {
		return options.url
	}

	const baseUrl = normalizeBaseUrl(process.env.NEXT_PUBLIC_BASE_URL || '')
	const locale = options.locale || (source as any)?.language || ''
	const path = normalizePath(options.path ?? derivePathFromSource(source))

	if (baseUrl) {
		return `${baseUrl}${locale}${path}`
	}

	if (locale) {
		return `/${locale}${path}`
	}

	return path || '/'
}

function normalizeBaseUrl(url: string) {
	if (!url) {
		return ''
	}
	return url.endsWith('/') ? url : `${url}/`
}

function normalizePath(path?: string | null) {
	if (!path) {
		return ''
	}
	return path.startsWith('/') ? path : `/${path}`
}

function derivePathFromSource(source?: JsonLdSource) {
	const metadata = getMetadata(source)
	const slug = metadata?.slug?.current
	if (!slug) {
		return ''
	}
	if (slug === 'index') {
		return ''
	}

	return `${getDirectoryFromType((source as any)?._type)}/${slug}`
}

function getDirectoryFromType(type?: string) {
	switch (type) {
		case 'blog.post':
		case 'blog.post.en':
			return '/blog'
		case 'help.center.post':
		case 'help.center.post.en':
			return '/help-center'
		case 'app.store.app':
			return '/integrations'
		default:
			return ''
	}
}

function removeEmpty(record: Record<string, unknown>) {
	return Object.fromEntries(
		Object.entries(record).filter(([, value]) =>
			value !== undefined && value !== null && value !== '',
		),
	)
}
