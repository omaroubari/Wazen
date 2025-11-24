import type { SanityImageObject } from '@sanity/image-url/lib/types/types'
import type { SanityDocument } from 'next-sanity'
import { CallToActionDoc } from 'sanity'

declare global {
	namespace Sanity {
		// documents

		type Site = SanityDocument<{
			title: string
			logo: Logo
			callToActionDoc?: CallToActionDoc[]
			ctas?: CTA[]
			headerMenu?: Navigation
			footerMenu?: Navigation
			social?: Navigation
			staticLinks?: Navigation
			ogimage?: string
			ga4?: string
			gtmId?: string
			contactInfo?: { contactInfo: any }
		}>

		type Navigation = SanityDocument<{
			title: string
			items?: (Link | Links | LinkList | LinkGroup)[]
		}>

		type PageBase = SanityDocument<{
			title: string
			metadata: Metadata
		}>

		type Page = PageBase & {
			readonly _type: 'page'
			modules?: Module[]
			callToActionDoc?: CallToActionDoc[]
		}

		type AppPage = PageBase & {
			readonly _type: 'page'
		}

		type CallToActionDoc = {
			_id: string
			_type: 'call.to.action.doc'
			_createdAt: string
			_updatedAt: string
			_rev: string
			language?: string
			content?: any
			image?: {
				asset?: {
					_ref: string
					_type: 'reference'
					_weak?: boolean
					[internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
				}
				media?: unknown
				hotspot?: SanityImageHotspot
				crop?: SanityImageCrop
				alt?: string
				onRight?: boolean
				loading?: 'lazy' | 'eager'
				_type: 'image'
			}
			ctas?: Array<
				{
					_key: string
				} & Cta
			>
			checkedList?: any
		}

		type BlogPost = PageBase & {
			readonly _type: 'blog.post' | 'blog.post.en'
			body: any
			readTime: number
			headings?: { style: string; text: string }[]
			categories: BlogCategory[]
			publishDate: string
			callToAction: any
			relatedPosts: BlogPost[]
		}

		type HelpCenterPost = PageBase & {
			readonly _type: 'help.center.post'
			body: any
			readTime: number
			headings?: { style: string; text: string }[]
			categories: BlogCategory[]
			publishDate: string
		}

		type BlogCategory = SanityDocument<{
			title: {
				ar: string
				en: string
			}
			slug?: {
				current: string
			}
		}>

		type Logo = SanityDocument<{
			name: string | StaticImport
			image: {
				default?: Image
				light?: Image
				dark?: Image
			}
			icon: Image
		}>

		type Testimonial = SanityDocument<{
			content: any
			author?: {
				name: string
				title?: string
				image?: Image
			}
		}>

		// objects

		type CTA = {
			link?: Link
			style?: string
			locale?: string
		}

		type Image = SanityImageObject &
			Partial<{
				alt: string
				loading: 'lazy' | 'eager'
			}>

		type Link = {
			readonly _type: 'link'
			label: string
			description: string
			type: 'internal' | 'external'
			internal?: Page | BlogPost
			external?: string
			params?: string
		}

		type AppLink = {
			readonly _type: 'link'
			label: string
			description: string
			type: 'internal' | 'external'
			internal?: Page | BlogPost
			external?: string
			params?: string
			image?: Image
		}

		type Group = {
			readonly _type: 'group'
			label: string
			params?: string
		}

		type LinkList = {
			readonly _type: 'link.list'
			label: string
			links?: Link[]
			link?: Link
			locale?: 'en' | 'ar' | undefined
		}

		type AppsLinkList = {
			readonly _type: 'App.link.list'
			label: string
			links?: AppLink[]
		}

		type LinkGroup = {
			readonly _type: 'link.group'
			label: string
			links?: LinkList[]
			link?: Link
			locale?: string
		}

		type Metadata = {
			title: string
			description: string
			slug: { current: string }
			image?: Image
			ogimage?: string
			noIndex: boolean
			jsonLd?: { code?: string }
		}

		type Module<T = any> = {
			_type: T
			_key: string
		} & T
	}
}

export {}
