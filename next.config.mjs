import { createClient } from 'next-sanity'
import groq from 'groq'
import withPlugins from 'next-compose-plugins'

import createNextIntlPlugin from 'next-intl/plugin'
import withBundleAnalyzer from '@next/bundle-analyzer'
const withNextIntl = createNextIntlPlugin()

const client = createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
	apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-06-02',
	useCdn: true,
})

const bundleAnalyzer = withBundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	},
	images: {
		minimumCacheTTL: 2678400, // 31 days
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.sanity.io',
			},
		],
		deviceSizes: [480, 560, 640, 750, 828, 1080, 1200, 1920, 2048],
	},

	// logging: {
	// 	fetches: {
	// 		fullUrl: true,
	// 	},
	// },
	async headers() {
		return [
			{
				source: '/:path*',
				headers: [
					{
						key: 'X-Powered-By',
						value: 'Studio Valence - High Performance Websites',
					},
				],
			},
		]
	},
	async redirects() {
		const redirects = await client.fetch(groq`*[_type == 'redirect']`)
		return redirects?.map(({ source, destination, permanent }) => ({
			source: source.startsWith('/')
				? encodeURI(source)
				: '/' + encodeURI(source),
			destination,
			permanent,
		}))
	},

	// logging: {
	// 	fetches: {
	// 		fullUrl: true,
	// 	},
	// },
	experimental: {
		optimizePackageImports: ['react-icons/*', '@sanity/visual-editing'],
	},
}

export default withPlugins([withNextIntl, [bundleAnalyzer]], nextConfig)
