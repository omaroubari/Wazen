'use server'

import { client } from './client'
import { token } from './token'
import { dev } from '../../lib/env'
import { draftMode } from 'next/headers'
import { defineLive, type QueryOptions, type QueryParams } from 'next-sanity'

export async function fetchSanity<T = any>({
	query,
	params = {},
	next,
}: {
	query: string
	params?: Partial<QueryParams>
	next?: QueryOptions['next']
}) {
	const preview = dev || (await draftMode()).isEnabled
	// const preview = (await draftMode()).isEnabled

	return client.fetch<T>(
		query,
		params,
		preview
			? {
					stega: true,
					perspective: 'drafts',
					useCdn: false,
					token,
					next: {
						revalidate: 0,
						...next,
					},
				}
			: {
					perspective: 'published',
					useCdn: true,
					next: {
						revalidate: 60, // every minute (reduced from 3600 for faster updates)
						...next,
					},
				},
	)
}

export const { sanityFetch, SanityLive } = defineLive({
	client,
	serverToken: token,
	browserToken: token,
})

export async function fetchSanityLive<T = any>(
	args: Parameters<typeof sanityFetch>[0],
) {
	const preview = dev || (await draftMode()).isEnabled

	const { data } = await sanityFetch({
		...args,
		perspective: preview ? 'drafts' : 'published',
	})

	return data as T
}
