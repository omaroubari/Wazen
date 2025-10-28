import { fetchSanity, fetchSanityLive } from '@/sanity/lib/fetch'
import { groq } from 'next-sanity'
import { creativeModuleQuery } from '@/sanity/lib/queries'
import Modules from '@/components/modules'
import processMetadata from '@/lib/processMetadata'
import { setRequestLocale } from 'next-intl/server'

type Props = {
	params: Promise<{ locale: 'en' | 'ar' }>
}

export default async function Page({ params }: Props) {
	const resolvedParams = await params
	setRequestLocale(resolvedParams.locale)
	const page = await getPage(resolvedParams.locale)
	return <Modules modules={page?.modules} locale={resolvedParams.locale} />
}

export async function generateMetadata({ params }: Props) {
	const resolvedParams = await params

	const page = await getPage(resolvedParams.locale)
	return processMetadata(page, resolvedParams.locale)
}

async function getPage(locale: 'en' | 'ar') {
	return await fetchSanityLive({
		query: groq`*[_type == 'page' && metadata.slug.current == "index" && language == '${locale}'][0]{
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
        callToActionDoc[0]->,
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
