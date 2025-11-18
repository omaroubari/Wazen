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
	const post = await getPost(await params)
	if (!post) notFound()
	return (
		<>
			<JsonLd
				data={post.metadata?.jsonLd}
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
	const post = await getPost(await params)
	if (!post) notFound()
	return processMetadata(post, resolvedParams.locale)
}

export async function generateStaticParams() {
	const slugs = await client.fetch<string[]>(
		groq`*[_type == 'blog.post' && defined(metadata.slug.current)].metadata.slug.current`,
	)
	return slugs.flatMap((slug: string) => [
		{ slug, locale: 'ar' },
		{ slug, locale: 'en' },
	])
}

async function getPost(params: { slug?: string; locale: 'en' | 'ar' }) {
	const decodedSlug = decodeURIComponent(params.slug || '')
	const type = params.locale == 'ar' ? 'blog.post' : 'blog.post.en'
	const locale = params.locale == 'ar' ? 'ar' : 'en'

	const data = await await fetchSanityLive({
		query: groq`*[(_type == 'blog.post' || _type == 'blog.post.en') && metadata.slug.current == $slug]{
            ...,
            'body': select(_type == 'image' => asset->, body),
            'readTime': length(pt::text(body)) / 1700,
            'headings': body[style in ['h2', 'h3']]{
                style,
                'text': pt::text(@)
            },
						"relatedPosts": *[
							_type == ^._type
							&& _id != ^._id
							&& count(categories) > 0
							&& array::intersects(categories[]._ref, ^.categories[]._ref)
						]|order(publishDate desc)[0...4]{
							...,
							categories[]->,
						},
            categories[]->,
						callToAction->{
							...,
							ctas[]{
								...,
								link{
									...,
									internal->{ title, metadata }
								}
							},
							callToActionDoc->
						},
            metadata {
                ...,
                'ogimage': image.asset->url
            }
        }`,

		params: { slug: decodedSlug, type },
		tags: ['blog'],
	})

	// if locale is en, return the en post, otherwise return the ar post
	if (locale === 'en') {
		return (
			data.find((post: Sanity.BlogPost) => post._type === 'blog.post.en') ||
			data.find((post: Sanity.BlogPost) => post._type === 'blog.post') ||
			null
		)
	}

	return (
		data.find((post: Sanity.BlogPost) => post._type === 'blog.post') ||
		data.find((post: Sanity.BlogPost) => post._type === 'blog.post.en') ||
		null
	)
}
