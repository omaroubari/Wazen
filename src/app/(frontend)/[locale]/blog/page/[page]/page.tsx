import { fetchSanity, fetchSanityLive } from '@/sanity/lib/fetch'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { creativeModuleQuery } from '@/sanity/lib/queries'
import Modules from '@/components/modules'
import processMetadata from '@/lib/processMetadata'
import { setRequestLocale } from 'next-intl/server'
import BlogList from '@/components/modules/blog/BlogList'
import BlogPagination from '@/components/modules/blog/BlogPagination'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/JsonLd'

const POSTS_PER_PAGE = 18

type Props = {
	params: Promise<{ locale: 'en' | 'ar'; page: string }>
}

export default async function BlogPaginationPage({ params }: Props) {
	const resolvedParams = await params

	// Parse and validate page number
	const pageNumber = parseInt(resolvedParams.page)
	if (isNaN(pageNumber) || pageNumber < 2) {
		// Page 1 should use the main blog route, not pagination route
		notFound()
	}

	const [page, blogData] = await Promise.all([
		getPage(resolvedParams.locale),
		getBlogPosts(resolvedParams.locale, pageNumber),
	])

	// Check if page number is valid (not beyond total pages)
	const totalPages = Math.ceil(blogData.totalCount / POSTS_PER_PAGE)
	if (pageNumber > totalPages) {
		notFound()
	}

	return (
		<>
			<JsonLd
				data={page?.metadata?.jsonLd}
				source={page}
				locale={resolvedParams.locale}
				path={`/blog/page/${pageNumber}`}
			/>
			<Modules modules={page?.modules} locale={resolvedParams.locale} />
			<div>
				<BlogList locale={resolvedParams.locale} posts={blogData.posts} />
				{totalPages > 1 && (
					<div className="section py-8">
						<BlogPagination
							locale={resolvedParams.locale}
							currentPage={pageNumber}
							totalPages={totalPages}
						/>
					</div>
				)}
			</div>
		</>
	)
}

export async function generateStaticParams({
	params,
}: {
	params: { locale: 'en' | 'ar' }
}) {
	const totalCount = await getTotalBlogCount(params.locale)
	const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE)

	const paths = []

	// Generate paths for pages 2 and beyond (page 1 is handled by the main blog route)
	for (let i = 2; i <= totalPages; i++) {
		paths.push({ page: i.toString() })
	}

	return paths
}

export async function generateMetadata({ params }: Props) {
	const resolvedParams = await params
	const page = await getPage(resolvedParams.locale)
	const pageNumber = parseInt(resolvedParams.page)

	// Add page number to title for SEO
	const baseMetadata = await processMetadata(page, resolvedParams.locale)

	return {
		...baseMetadata,
		title: `${baseMetadata.title} - Page ${pageNumber}`,
	}
}

async function getTotalBlogCount(locale: 'en' | 'ar') {
	const type = locale === 'en' ? 'blog.post.en' : 'blog.post'

	// Use client directly for static generation to avoid draftMode issues
	return await client.fetch(
		groq`count(*[_type == $type])`,
		{ type },
		{
			perspective: 'published',
			useCdn: true,
		},
	)
}

async function getBlogPosts(locale: 'en' | 'ar', page: number = 1) {
	const type = locale === 'en' ? 'blog.post.en' : 'blog.post'
	const offset = (page - 1) * POSTS_PER_PAGE

	const [posts, totalCount] = await Promise.all([
		fetchSanityLive({
			query: groq`*[_type == $type] | order(publishDate desc) [$offset...($offset + $limit)] {
				title,
				publishDate,
				metadata,
				body,
				categories[]->{
					title,
					slug
				}
			}`,
			params: {
				type,
				offset,
				limit: POSTS_PER_PAGE,
			},
			tags: ['blog'],
		}),
		fetchSanityLive({
			query: groq`count(*[_type == $type])`,
			params: { type },
			tags: ['blog'],
		}),
	])

	return {
		posts,
		totalCount,
	}
}

async function getPage(locale: 'en' | 'ar') {
	return await fetchSanityLive({
		query: groq`*[_type == 'page' && metadata.slug.current == "blog" && language == '${locale}'][0]{
			...,
			modules[]{
				...,
				ctas[]{
					...,
					link{
						...,
						internal->{ title, metadata }
					}
				},
				products[]{
					...,
						link{
							...,
							internal->{ title, metadata },
					}
				},
				_type == 'faq-list' => {
          sideNote {
            ...,
            link {
              ...,
              internal->{ title, metadata }
            }
          }
        },
				categories[]->{title, slug},
				logos[]->,
				plans[]->,
				partnerslogos[]->,
				testimonials[]->,
				items[]->,
				${creativeModuleQuery}
			},
			metadata {
				...,
				'ogimage': image.asset->url
			}
		}`,
		params: {},
		tags: ['page'],
	})
}
