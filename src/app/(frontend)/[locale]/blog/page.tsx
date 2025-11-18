import { fetchSanity, fetchSanityLive } from '@/sanity/lib/fetch'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { creativeModuleQuery } from '@/sanity/lib/queries'
import Modules from '@/components/modules'
import processMetadata from '@/lib/processMetadata'
import { setRequestLocale } from 'next-intl/server'
import BlogList from '@/components/modules/blog/BlogList'
import BlogPagination from '@/components/modules/blog/BlogPagination'
import JsonLd from '@/components/JsonLd'

const POSTS_PER_PAGE = 18

type Props = {
	params: Promise<{ locale: 'en' | 'ar' }>
}

export default async function Page({ params }: Props) {
	const resolvedParams = await params

	const [page, blogData] = await Promise.all([
		getPage(resolvedParams.locale),
		getBlogPosts(resolvedParams.locale, 1), // Always page 1 for main blog page
	])

	const totalPages = Math.ceil(blogData.totalCount / POSTS_PER_PAGE)

	return (
		<>
			<JsonLd
				data={page?.metadata?.jsonLd}
				source={page}
				locale={resolvedParams.locale}
			/>
			<Modules modules={page?.modules} locale={resolvedParams.locale} />
			<div>
				<BlogList locale={resolvedParams.locale} posts={blogData.posts} />
				{totalPages > 1 && (
					<div className="section py-8">
						<BlogPagination
							locale={resolvedParams.locale}
							currentPage={1}
							totalPages={totalPages}
						/>
					</div>
				)}
			</div>
		</>
	)
}

export async function generateMetadata({ params }: Props) {
	const resolvedParams = await params
	const page = await getPage(resolvedParams.locale)
	return processMetadata(page, resolvedParams.locale)
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
					title, slug
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
