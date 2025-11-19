import { fetchSanity, fetchSanityLive } from '@/sanity/lib/fetch'
import { groq } from 'next-sanity'
import { notFound } from 'next/navigation'
import Post from '@/components/modules/blog/Post'
import processMetadata from '@/lib/processMetadata'
import { setRequestLocale } from 'next-intl/server'
import { client } from '@/sanity/lib/client'
import JsonLd from '@/components/JsonLd'

type Props = {
	params: Promise<{ slug?: string; locale: 'en' | 'ar' }>
}

export default async function Page({ params }: Props) {
	const resolvedParams = await params
	setRequestLocale(resolvedParams.locale)
	const post = await getPost(resolvedParams)
	if (!post) notFound()
	return (
		<>
			<JsonLd
				json={post.metadata?.jsonLd.code}
				source={post}
				locale={resolvedParams.locale}
			/>
			<Post post={post} locale={resolvedParams.locale} />
		</>
	)
}

export async function generateMetadata({ params }: Props) {
	const resolvedParams = await params
	setRequestLocale(resolvedParams.locale)
	const post = await getPost(resolvedParams)
	if (!post) notFound()
	return processMetadata(post, resolvedParams.locale)
}

export async function generateStaticParams() {
	const slugs = await client.fetch<string[]>(
		groq`*[(_type == 'help.center.post' || _type == 'help.center.post.en') && defined(metadata.slug.current)].metadata.slug.current`,
	)

	return slugs.flatMap((slug: string) => [
		{ slug, locale: 'ar' },
		{ slug, locale: 'en' },
	])
}

async function getPost(params: { slug?: string; locale: 'en' | 'ar' }) {
	const decodedSlug = decodeURIComponent(params.slug || '')

	return await fetchSanityLive({
		query: groq`*[(_type == 'help.center.post' || _type == 'help.center.post.en') && metadata.slug.current == $slug][0]{
            ...,
            'body': select(_type == 'image' => asset->, body),
            'readTime': length(pt::text(body)) / 200,
            'headings': body[style in ['h2', 'h3']]{
                style,
                'text': pt::text(@)
            },
            categories[]->,
            metadata {
                ...,
                'ogimage': image.asset->url
            }
        }`,

		params: {
			slug: decodedSlug,
		},
		tags: ['help-center'],
	})
}
