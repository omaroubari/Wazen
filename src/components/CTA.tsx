import { Link } from '@/i18n/routing'
import processUrl from '@/lib/processUrl'
import { cn } from '@/lib/utils'
import * as m from 'motion/react-m'
import { stegaClean } from 'next-sanity'

export default function CTA({
	link,
	locale,
	style,
	className,
	children,
	...rest
}: Sanity.CTA &
	React.HTMLAttributes<HTMLAnchorElement> & { locale?: 'ar' | 'en' }) {
	const domSafeRest = Object.fromEntries(
		Object.entries(rest).filter(([key, value]) => {
			// Drop Sanity meta fields or any prop starting with underscore
			if (key.startsWith('_')) return false
			// Drop undefined values to avoid hydration diffs
			return value !== undefined
		}),
	) as React.AnchorHTMLAttributes<HTMLAnchorElement>

	const props = {
		className: cn(stegaClean(style), className) || undefined,
		children:
			children || link?.label || link?.internal?.title || link?.external,
		...domSafeRest,
	}
	const FADE_DOWN_ANIMATION_VARIANTS = {
		hidden: { opacity: 0, y: -10 },
		visible: { opacity: 1, y: 0, transition: { type: 'spring' } },
	}

	if (link?.type === 'internal' && link.internal)
		return (
			<Link
				locale={locale as 'ar' | 'en'}
				href={processUrl(link.internal, {
					base: false,
					params: link.params,
				})}
				{...(props as any)}

				// legacyBehavior
				// passHref
			>
				<m.span layout variants={FADE_DOWN_ANIMATION_VARIANTS as any}>
					{props.children}
				</m.span>
			</Link>
		)

	if (link?.type === 'external' && link.external)
		return (
			<m.a
				href={link.external}
				{...(props as any)}
				variants={FADE_DOWN_ANIMATION_VARIANTS}
			>
				{props.children}
			</m.a>
		)

	return props.children
}
