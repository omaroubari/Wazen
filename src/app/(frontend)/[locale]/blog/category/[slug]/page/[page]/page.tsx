import { fetchSanityLive } from '@/sanity/lib/fetch'
import { groq } from 'next-sanity'
import { creativeModuleQuery } from '@/sanity/lib/queries'
import Modules from '@/components/modules'
import processMetadata from '@/lib/processMetadata'
import { setRequestLocale } from 'next-intl/server'
import BlogList from '@/components/modules/blog/BlogList'
import BlogPagination from '@/components/modules/blog/BlogPagination'
import { notFound } from 'next/navigation'
import { slugify } from '@/lib/slugify'
import { client } from '@/sanity/lib/client'
import JsonLd from '@/components/JsonLd'

const POSTS_PER_PAGE = 18

type Props = {
	params: Promise<{ locale: 'en' | 'ar'; slug: string; page: string }>
}

export default async function CategoryPaginationPage({ params }: Props) {
	const resolvedParams = await params

	// Parse and validate page number
	const pageNumber = parseInt(resolvedParams.page)
	if (isNaN(pageNumber) || pageNumber < 2) {
		// Page 1 should use the main category route, not pagination route
		notFound()
	}

	const [categoryData, blogData, page] = await Promise.all([
		getCategory(resolvedParams.slug, resolvedParams.locale),
		getBlogPostsByCategory(
			resolvedParams.slug,
			resolvedParams.locale,
			pageNumber,
		),
		getPage(resolvedParams.locale),
	])

	if (!categoryData) {
		notFound()
	}

	// Check if page number is valid (not beyond total pages)
	const totalPages = Math.ceil(blogData.totalCount / POSTS_PER_PAGE)
	if (pageNumber > totalPages) {
		notFound()
	}

	return (
		<>
			<JsonLd
				json={page.metadata?.jsonLd?.code}
				source={page}
				locale={resolvedParams.locale}
				path={`/blog/category/${resolvedParams.slug}/page/${pageNumber}`}
			/>
			<Modules
				modules={page?.modules}
				locale={resolvedParams.locale}
				slug={resolvedParams.slug}
			/>
			<BlogList
				locale={resolvedParams.locale}
				posts={blogData.posts}
				emptyMessage={
					resolvedParams.locale === 'en'
						? 'No blog posts found in this category.'
						: 'لم يتم العثور على مقالات في هذه الفئة.'
				}
			/>
			<div className="section py-8">
				<BlogPagination
					locale={resolvedParams.locale}
					currentPage={pageNumber}
					totalPages={totalPages}
					categorySlug={resolvedParams.slug}
				/>
			</div>
		</>
	)
}

export async function generateStaticParams({
	params,
}: {
	params: { locale: 'en' | 'ar'; slug: string }
}) {
	// Get the category first
	const category = await getCategory(params.slug, params.locale)
	if (!category) return []

	const totalCount = await getTotalCategoryPostCount(params.slug, params.locale)
	const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE)

	const paths = []

	// Generate paths for pages 2 and beyond (page 1 is handled by the main category route)
	for (let i = 2; i <= totalPages; i++) {
		paths.push({ page: i.toString() })
	}

	return paths
}

export async function generateMetadata({ params }: Props) {
	const resolvedParams = await params
	const category = await client.fetch<Sanity.BlogCategory>(
		groq`*[_type == 'blog.category' && slug.current == $slug][0] {
			title
		}`,
		{
			slug: resolvedParams.slug,
		},
	)

	if (!category) {
		return {
			title: 'Category Not Found',
			description: 'The requested category could not be found.',
		}
	}

	const title =
		resolvedParams.locale === 'en'
			? category.title?.en || category.title
			: category.title?.ar || category.title

	const pageNumber = parseInt(resolvedParams.page)

	return {
		title: `${title} - Blog - Page ${pageNumber}`,
		description: `Browse blog posts in the ${title} category - Page ${pageNumber}`,
	}
}

async function getCategory(slug: string, locale: 'en' | 'ar') {
	// Decode the URL-encoded slug
	const decodedSlug = decodeURIComponent(slug)

	// Get all categories and find the one that matches the slug
	const categories = await client.fetch<Sanity.BlogCategory[]>(
		groq`*[_type == 'blog.category']{
			_id,
			title,
			slug
		}`,
	)

	// Find category by comparing slugified titles (both encoded and decoded versions)
	return categories.find((category: any) => {
		const enSlug = slugify(category.title.en)
		const arSlug = slugify(category.title.ar)

		// Check against both original slug and decoded slug
		return (
			enSlug === slug ||
			arSlug === slug ||
			enSlug === decodedSlug ||
			arSlug === decodedSlug
		)
	})
}

async function getTotalCategoryPostCount(
	categorySlug: string,
	locale: 'en' | 'ar',
) {
	const type = locale === 'en' ? 'blog.post.en' : 'blog.post'

	// First get the category ID
	const category = await getCategory(categorySlug, locale)
	if (!category) {
		return 0
	}

	return await client.fetch(
		groq`count(*[_type == $type && $categoryId in categories[]->_id])`,
		{
			type,
			categoryId: category._id,
		},
		{
			perspective: 'published',
			useCdn: true,
		},
	)
}

async function getBlogPostsByCategory(
	categorySlug: string,
	locale: 'en' | 'ar',
	page: number = 1,
) {
	const type = locale === 'en' ? 'blog.post.en' : 'blog.post'
	const offset = (page - 1) * POSTS_PER_PAGE

	// First get the category ID
	const category = await getCategory(categorySlug, locale)
	if (!category) {
		return { posts: [], totalCount: 0 }
	}

	const [posts, totalCount] = await Promise.all([
		fetchSanityLive({
			query: groq`*[_type == $type && $categoryId in categories[]->_id] | order(publishDate desc) [$offset...($offset + $limit)] {
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
				categoryId: category._id,
				offset,
				limit: POSTS_PER_PAGE,
			},
			tags: ['blog'],
		}),
		fetchSanityLive({
			query: groq`count(*[_type == $type && $categoryId in categories[]->_id])`,
			params: {
				type,
				categoryId: category._id,
			},
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
