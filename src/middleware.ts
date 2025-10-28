import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { createClient } from 'next-sanity'
import groq from 'groq'

type Redirect = {
	_updatedAt: string
	destination: string
	permanent: boolean
	source: string
}

const intlMiddleware = createMiddleware(routing)

const PUBLIC_FILE = /\.(.*)$/

// Create Sanity client for middleware
const client = createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
	apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-06-02',
	useCdn: true,
	perspective: 'published',
})

// Cache for redirects with TTL
let redirectsCache: { data: Redirect[] | null; timestamp: number } = {
	data: null,
	timestamp: 0,
}
const CACHE_TTL = 60 * 60 * 1000 // 1 hour

async function getRedirects() {
	const now = Date.now()

	// Return cached data if it's still valid
	if (redirectsCache.data && now - redirectsCache.timestamp < CACHE_TTL) {
		return redirectsCache.data
	}

	try {
		const redirects = await client.fetch<Redirect[]>(
			groq`*[_type == 'redirect']`,
		)
		redirectsCache = { data: redirects || [], timestamp: now }
		return redirects || []
	} catch (error) {
		console.warn('Failed to fetch redirects: ', error)
		// Return cached data even if expired, or empty array
		return redirectsCache.data || []
	}
}

// Helper function to normalize paths for comparison
function normalizePath(path: string): string {
	// Remove trailing slash unless it's the root path
	return path === '/' ? path : path.replace(/\/$/, '')
}

export default async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	// Check for redirects before running intl middleware
	const redirects = await getRedirects()

	if (redirects.length > 0) {
		for (const redirect of redirects) {
			let { source, destination, permanent } = redirect

			// Normalize source to ensure it starts with /
			const normalizedSource = source.startsWith('/')
				? encodeURI(source)
				: '/' + encodeURI(source)

			// Check for exact match first (with trailing slash normalization)
			if (normalizePath(pathname) === normalizePath(normalizedSource)) {
				// redirect before localization runs
				return NextResponse.redirect(
					new URL(destination, request.url),
					permanent ? 308 : 307,
				)
			}

			// Check for locale-prefixed matches
			// Extract potential locale from pathname (e.g., /ar/our-pricing -> ar, our-pricing)
			// Run redirects against locale-prefixed matches
			// const pathParts = pathname.split('/').filter(Boolean)

			// if (
			// 	pathParts.length > 0 &&
			// 	routing.locales.includes(pathParts[0] as any)
			// ) {
			// 	const locale = pathParts[0]
			// 	const restOfPath = pathParts.slice(1).join('/')

			// 	// check if the rest matches the redirect source
			// 	const pathWithoutLocale = '/' + restOfPath

			// 	// Check if the rest of the path matches the redirect source
			// 	if (
			// 		normalizePath(pathWithoutLocale) === normalizePath(normalizedSource)
			// 	) {

			// 		// Preserve locale in destination if destination doesn't already include it
			// 		let finalDestination = destination
			// 		if (
			// 			!destination.startsWith(`/${locale}/`) &&
			// 			!destination.startsWith('http')
			// 		) {
			// 			finalDestination = `/${locale}${destination.startsWith('/') ? '' : '/'}${destination}`
			// 		}
			// 		request.nextUrl.pathname = finalDestination
			// 	}
			// }
		}
	}

	const response = intlMiddleware(request)

	const location = response.headers.get('Location')
	if (location) {
		const redirectResponse = NextResponse.redirect(
			new URL(location, request.url),
			308,
		)
		response.cookies.getAll().forEach((cookie) => {
			redirectResponse.cookies.set(cookie)
		})
		response.headers.forEach((value, key) => {
			const lowerKey = key.toLowerCase()
			if (lowerKey === 'location' || lowerKey === 'set-cookie') {
				return
			}
			redirectResponse.headers.set(key, value)
		})
		return redirectResponse
	}

	return response
}

export const config = {
	matcher: ['/((?!api|admin|_next|_vercel|.*\\..*).*)'],
}
