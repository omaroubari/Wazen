// import {Link} from '@/i18n/routing'
import { Link } from '@/i18n/routing'
import processUrl from '@/lib/processUrl'
import { cn } from '@/lib/utils'
import { stegaClean } from 'next-sanity'
import { buttonVariants } from './ui/button'
import { VariantProps } from 'class-variance-authority'

export default function LinkButton({
	link,
	locale,
	style,
	className,
	children,
	variant = stegaClean(style),
	size,
	...rest
}: Sanity.CTA &
	React.HTMLAttributes<HTMLAnchorElement> &
	VariantProps<typeof buttonVariants>) {
	const props = {
		className: cn(buttonVariants({ variant, size }), className) || undefined,
		children:
			children || link?.label || link?.internal?.title || link?.external,
		...rest,
	}

	if (link?.type === 'internal' && link.internal)
		return (
			<Link
				locale={locale as 'ar' | 'en'}
				href={processUrl(link.internal, {
					base: false,
					params: link.params,
				})}
				{...props}
			/>
		)

	if (link?.type === 'external' && link.external)
		return (
			<a href={link.external} {...props}>
				{link.label}
			</a>
		)

	return props.children
}
