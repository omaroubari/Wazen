import { buildJsonLdFallback } from '@/lib/buildJsonLdFallback'

type JsonLdSource = Parameters<typeof buildJsonLdFallback>[0]

type JsonLdProps = {
	json?: string
	source?: JsonLdSource
	locale?: string
	path?: string
	url?: string
}

type NormalizedJsonLd = {
	key: string
	json: string
}

export default function JsonLd({
	json,
	source,
	locale,
	path,
	url,
}: JsonLdProps) {
	let parsedJson

	try {
		const parsed = JSON.parse(json || '')
		parsedJson = Array.isArray(parsed) ? parsed : [parsed]
	} catch {
		console.info(
			'JsonLd: using fallback for invalid or missing JSON-LD: ',
			path,
		)
		parsedJson = buildJsonLdFallback(source, { locale, path, url })
	}

	const entries = parsedJson
		?.map((value, index) => normalizeJsonLd(value, index))
		.filter((value): value is NormalizedJsonLd => Boolean(value))

	if (!entries?.length) {
		return null
	}

	return entries.map((entry) => (
		<script
			key={entry.key}
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: entry.json }}
		/>
	))
}

function normalizeJsonLd(
	value: unknown,
	index: number,
): NormalizedJsonLd | null {
	if (!value) {
		return null
	}

	const payload = typeof value === 'string' ? tryParseJson(value) : value
	if (!payload) {
		return null
	}

	if (typeof payload !== 'object' && !Array.isArray(payload)) {
		return null
	}

	const json = safeStringify(payload)
	if (!json) {
		return null
	}

	const key = getKey(value, index)

	return { key, json }
}

function tryParseJson(value: string) {
	try {
		return JSON.parse(value)
	} catch (error) {
		warn('Invalid JSON-LD entry skipped', error)
		return null
	}
}

function getKey(value: unknown, index: number) {
	if (value && typeof value === 'object' && '_key' in value) {
		const keyValue = (value as { _key?: string })._key
		if (keyValue) {
			return keyValue
		}
	}

	return `jsonld-${index}`
}

function safeStringify(value: unknown) {
	try {
		const json = JSON.stringify(value)
		if (!json) {
			return null
		}

		return json.replace(/</g, '\\u003c')
	} catch (error) {
		warn('Unable to serialize JSON-LD entry', error)
		return null
	}
}

function warn(message: string, error: unknown) {
	if (process.env.NODE_ENV !== 'production') {
		console.warn(message, error)
	}
}
