import { cn } from '@/lib/utils'
import CTA from './CTA'
import LinkButton from './LinkButton'

export default function CTAList({
	ctas,
	className,
	locale,
}: React.HTMLAttributes<HTMLAnchorElement> & {
	ctas?: Sanity.CTA[]
	locale?: 'en' | 'ar'
}) {
	return (
		<div
			className={cn(
				'flex flex-col items-center gap-4 max-md:gap-2 md:flex-row',
				className,
			)}
		>
			{ctas?.map((cta, key) => <CTA {...cta} key={key} locale={locale} />)}
		</div>
	)
}
