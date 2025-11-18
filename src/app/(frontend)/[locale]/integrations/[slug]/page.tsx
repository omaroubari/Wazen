import { fetchSanity, fetchSanityLive } from '@/sanity/lib/fetch'
import { groq } from 'next-sanity'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import SingleAppHeader from '@/components/modules/app-store/SingleAppHeader'
import CallToAction from '@/components/modules/CallToAction'
import processMetadata from '@/lib/processMetadata'
import SuggestedApps from '@/components/modules/app-store/SuggestedApps'
import { getTranslations } from 'next-intl/server'
import { client } from '@/sanity/lib/client'
import JsonLd from '@/components/JsonLd'

type Props = {
	params: Promise<{ slug?: string; locale: 'en' | 'ar' }>
}

// Define type for the CTA Document fetched from Sanity
type CtaDoc = {
	content: any
	ctas: Sanity.CTA[]
	checkedList: any
	image: Sanity.Image & { alt?: string; onRight?: boolean }
}

export default async function Page({ params }: Props) {
	const resolvedParams = await params
	const locale = resolvedParams.locale
	setRequestLocale(resolvedParams.locale)

	const t = await getTranslations('App')

	const app = await getPage(resolvedParams)
	if (!app) notFound()

	// Fetch the default CTA document data within the Page component
	const ctaDocData = await fetchSanityLive<Sanity.CallToActionDoc>({
		query: groq`*[_type == 'call.to.action.doc' && language == $locale][0]{
			...,
			content,
			ctas[]{
				...,
				link{
					...,
					internal->{ title, metadata }
				}
			},
			checkedList,
			image{
				...,
				alt,
				onRight,
				asset->
			},
		}`,
		params: { locale }, // Use appropriate tag for revalidation
	})

	return (
		<>
			<JsonLd
				data={app.metadata?.jsonLd}
				source={app}
				locale={locale}
			/>
			<SingleAppHeader app={app} />
			<SuggestedApps locale={locale} t={t} />
			{/* Pass the fetched ctaDocData to CallToAction */}
			{ctaDocData && (
				<CallToAction
					{...ctaDocData}
					// Pass other props if needed, e.g., textAlign
				/>
			)}
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
		groq`*[_type == 'app.store.app' && defined(metadata.slug.current)].metadata.slug.current`,
	)
	const params = slugs.flatMap((slug: string) => [
		{ slug, locale: 'ar' },
		{ slug, locale: 'en' },
	])
	return params
}

async function getPage(params: { slug?: string; locale: 'en' | 'ar' }) {
	return await fetchSanityLive({
		query: groq`*[_type == 'app.store.app' && metadata.slug.current == $slug && language == $locale ][0]{
			..., 
			icon,
			asset->,
			metadata {
				...,
				'ogimage': image.asset->url + '?w=1200'
			}
	 }`,

		params: {
			locale: params.locale,
			slug: params.slug,
		},
		tags: ['integrations'],
	})
}
