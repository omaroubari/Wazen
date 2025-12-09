'use client'

import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import type { ReactNode } from 'react'
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'

import CTAList from '@/components/CTAList'
import { Img } from '@/components/Img'

const VISIT_COUNT_STORAGE_KEY = 'wazen:cta-modal:visit-count'

function shouldDisplayModal(visitCount: number) {
	if (process.env.NEXT_PUBLIC_DISPLAY_MODAL) return true
	if (visitCount === 2) return true
	if (visitCount > 2) {
		return (visitCount - 2) % 4 === 0
	}
	return false
}

type SiteCallToActionContextValue = {
	documents: Sanity.CallToActionDoc[] | null
	locale?: 'en' | 'ar'
	setOverrideDocuments: (docs: Sanity.CallToActionDoc[] | null) => void
}

const SiteCallToActionContext = createContext<
	SiteCallToActionContextValue | undefined
>(undefined)

function useSiteCallToAction() {
	const context = useContext(SiteCallToActionContext)
	if (!context) {
		throw new Error(
			'SiteCallToActionModal must be used within a SiteCallToActionProvider',
		)
	}
	return context
}

export function SiteCallToActionProvider({
	children,
	documents,
	locale,
}: {
	children: ReactNode
	documents?: Sanity.CallToActionDoc[] | null
	locale?: 'en' | 'ar'
}) {
	const siteDocuments = documents ?? null
	const [overrideDocuments, setOverrideDocumentsRaw] = useState<
		Sanity.CallToActionDoc[] | null
	>(null)

	const setOverrideDocuments = useCallback(
		(next: Sanity.CallToActionDoc[] | null) => {
			setOverrideDocumentsRaw(next && next.length > 0 ? next : null)
		},
		[],
	)

	useEffect(() => {
		setOverrideDocumentsRaw(null)
	}, [siteDocuments])

	const value = useMemo<SiteCallToActionContextValue>(
		() => ({
			documents: overrideDocuments ?? siteDocuments,
			locale,
			setOverrideDocuments,
		}),
		[overrideDocuments, siteDocuments, locale, setOverrideDocuments],
	)

	return (
		<SiteCallToActionContext.Provider value={value}>
			{children}
		</SiteCallToActionContext.Provider>
	)
}

export function PageCallToActionOverride({
	documents,
}: {
	documents?: Sanity.CallToActionDoc[] | null
}) {
	const { setOverrideDocuments } = useSiteCallToAction()

	useEffect(() => {
		const next = documents && documents.length > 0 ? documents : null
		setOverrideDocuments(next)
		return () => {
			setOverrideDocuments(null)
		}
	}, [documents, setOverrideDocuments])

	return null
}

export default function SiteCallToActionModal() {
	const { documents, locale } = useSiteCallToAction()
	const callToAction = documents?.[0]
	const [open, setOpen] = useState(false)
	const hasEvaluated = useRef(false)

	useEffect(() => {
		if (!callToAction) return
		if (hasEvaluated.current) return
		hasEvaluated.current = true

		if (typeof window === 'undefined') return

		try {
			const localStorage = window.localStorage
			if (
				!localStorage ||
				typeof localStorage.getItem !== 'function' ||
				typeof localStorage.setItem !== 'function'
			) {
				return
			}

			const rawVisits = localStorage.getItem(VISIT_COUNT_STORAGE_KEY)
			const parsedVisits = rawVisits ? parseInt(rawVisits, 10) : 0
			const safeVisits =
				Number.isFinite(parsedVisits) && parsedVisits >= 0 ? parsedVisits : 0
			const nextVisits = safeVisits + 1
			localStorage.setItem(VISIT_COUNT_STORAGE_KEY, String(nextVisits))

			if (shouldDisplayModal(nextVisits)) {
				setOpen(true)
			}
		} catch (error) {
			// If localStorage is unavailable, fail silently.
		}
	}, [callToAction])

	const contentComponents = useMemo<PortableTextComponents>(
		() => ({
			types: {
				block: ({ value }: PortableTextTypeComponentProps<any>) => {
					const text = value.children?.map((child: any) => child.text).join('')

					if (!text) return null

					if (value.style === 'h2') {
						return (
							<h2 className="text-2xl leading-tight font-semibold text-cyan-950">
								{text}
							</h2>
						)
					}

					if (value.style === 'h3') {
						return (
							<p className="text-xl leading-tight font-semibold text-cyan-950">
								{text}
							</p>
						)
					}

					return <p className="text-base text-gray-600">{text}</p>
				},
			},
		}),
		[],
	)

	const checklistComponents = useMemo<PortableTextComponents>(
		() => ({
			types: {
				block: ({ value }: PortableTextTypeComponentProps<any>) => {
					const text = value.children?.map((child: any) => child.text).join('')

					if (!text?.trim()) return null

					return (
						<li className="flex items-start gap-2 text-sm text-gray-600">
							<span
								aria-hidden="true"
								className="mt-[3px] h-2 w-2 rounded-full bg-teal-500"
							/>
							{text}
						</li>
					)
				},
			},
		}),
		[],
	)

	if (!callToAction) {
		return null
	}

	const { content, image, ctas, checkedList } = callToAction

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="h-fit max-h-[calc(100svh-32px)] w-[calc(100vw-24px)] max-w-xl gap-6 overflow-scroll rounded-2xl bg-white p-4">
				{image?.asset && (
					<div className="mt-8 overflow-hidden rounded-lg bg-teal-50">
						<Img
							image={image}
							alt={image?.alt || ''}
							className="h-full w-full object-cover"
							draggable={false}
							loading="lazy"
						/>
					</div>
				)}

				<div className="flex flex-col gap-4">
					{content && (
						<PortableText value={content} components={contentComponents} />
					)}
					{checkedList && (
						<ul className="flex list-none flex-col gap-2">
							<PortableText
								value={checkedList}
								components={checklistComponents}
							/>
						</ul>
					)}
				</div>
				{ctas && ctas.length > 0 && (
					<CTAList
						ctas={ctas as any}
						locale={locale}
						className="w-full *:h-11 *:rounded-lg *:px-6 *:text-sm"
					/>
				)}
			</DialogContent>
		</Dialog>
	)
}
