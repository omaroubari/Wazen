import { fetchSanity, fetchSanityLive } from '@/sanity/lib/fetch'
import { groq } from 'next-sanity'
import { creativeModuleQuery } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import Modules from '@/components/modules'
import { PageCallToActionOverride } from '@/components/SiteCallToActionModal'
import processMetadata from '@/lib/processMetadata'
import { setRequestLocale } from 'next-intl/server'
import { client } from '@/sanity/lib/client'

type Props = {
	params: Promise<{ slug: string[]; locale: 'en' | 'ar' }>
}

export const dynamic = 'force-dynamic'

export default async function Page({ params }: Props) {
	const resolvedParams = await params
	setRequestLocale(resolvedParams.locale)
	const page = await getPage(resolvedParams)
	if (!page) notFound()
	return (
		<>
			<PageCallToActionOverride documents={page.callToActionDoc} />
			<Modules modules={page.modules} locale={resolvedParams.locale} />
		</>
	)
}

export async function generateMetadata({ params }: Props) {
	const resolvedParams = await params
	const page = await getPage(resolvedParams)
	if (!page) notFound()
	return processMetadata(page, resolvedParams.locale)
}

export async function generateStaticParams() {
	const slugs = await client.fetch<string[]>(
		groq`*[
			_type == 'page' &&
			defined(metadata.slug.current) &&
			!(metadata.slug.current in ['index', '404'])
		].metadata.slug.current`,
	)
	return slugs.map((slug: string) => ({ slug: slug.split('/') }))
}

async function getPage(params: { slug: string[]; locale: 'en' | 'ar' }) {
	return await fetchSanityLive<Sanity.Page>({
		query: groq`*[
			_type == 'page' &&
			metadata.slug.current == $slug && language == '${params.locale}' &&
			!(metadata.slug.current in ['index', '404'])
		][0]{
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
				categories[]->{title, _id, slug},
				items[]->,
				logos[]->,
				partnerslogos[]->,
				plans[]->,
				testimonials[]->,
				callToActionDoc[0]->,
				'headings': select(
					tableOfContents => content[style in ['h2', 'h3']]{
						style,
						'text': pt::text(@)
					}
				),
				${creativeModuleQuery}
			},
			callToActionDoc[]->,
			metadata {
				...,
				'ogimage': image.asset->url + '?w=1200'
			}
		}`,

		params: {
			locale: params.locale,
			slug: params.slug?.join('/'),
		},
		tags: ['page'],
	})
}
