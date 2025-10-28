import { fetchSanity, fetchSanityLive } from './fetch'
import { groq } from 'next-sanity'

const navigationProjection = /* groq */ `
	title,
	items[]{
		...,
		internal->{ _type, title, metadata },
		links[]{
			...,
			internal->{ _type, title, metadata },
			links[]{
			...,
			internal->{ _type, title, metadata }
			}
		}
	}
`

export const creativeModuleQuery = groq`
	modules[]{
		...,
		subModules[]{
			...,
			ctas[]{
				...,
				link{
					...,
					internal->{ title, metadata }
				}
			}
		}
	}
`

export async function getSite(locale: any) {
	return await fetchSanityLive({
		query: groq`
			*[_type == 'site' && language == $locale  ][0]{
				...,
				callToActionDoc[]->{
				...,
				link{
					...,
					internal->{ _type, title, metadata }
				}
				},
				ctas[]{
					...,
					link{
						...,
						internal->{ _type, title, metadata }
					}
				},
				headerMenu->{ ${navigationProjection} },
				footerMenu->{ ${navigationProjection} },
				social->{ ${navigationProjection} },
				staticLinks->{ ${navigationProjection} },
				'ogimage': ogimage.asset->url,
				"contactInfo": *[_type == 'page' && metadata.slug.current == "contact-us" && language == $locale][0]{
					"contactInfo": modules[0].contactInfo
				}
			}
		`,

		params: {
			locale: locale,
		},
	})
}
