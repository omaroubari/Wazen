import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn, slug } from '@/lib/utils'
import { Icon } from '@iconify-icon/react/dist/iconify.mjs'
import { useLocale, useTranslations } from 'next-intl'

export default function TableOfContents({
	headings,
}: {
	headings: Sanity.BlogPost['headings']
}) {
	const t = useTranslations('Blog')
	const locale = useLocale()
	return (
		<Accordion type="single" collapsible className="text-start">
			<AccordionItem
				value="contents"
				className="overflow-hidden rounded-2xl border-0"
			>
				<AccordionTrigger className="rounded-t-2xl bg-teal-100 p-4 hover:bg-teal-100/80 hover:text-[unset] [&_svg]:size-5">
					<h3 className="flex flex-row items-center gap-2 font-semibold text-cyan-950">
						<div className="size-9 rounded bg-cyan-950 p-2">
							<Icon
								icon="ph:bookmarks-duotone"
								className="size-5 text-white"
								height="none"
							/>
						</div>
						{t('Contents')}
					</h3>
				</AccordionTrigger>
				<AccordionContent>
					<ScrollArea
						className="max-h-[calc(var(--spacing-fold)-72px-1rem)] rounded-b-2xl bg-teal-50"
						dir={locale === 'ar' ? 'rtl' : 'ltr'}
					>
						<ul className="flex flex-col items-start gap-4 px-6 pt-3 pb-6">
							{headings?.map(({ text, style }, key) => (
								<li
									className={cn(
										style == 'h2' && 'font-semibold',
										style == 'h3' && 'translate-x-0 font-medium',
										'w-full max-w-72 grow text-sm text-cyan-950/60 transition-[color,_translate] ease-in-out hover:-translate-x-2 hover:text-cyan-950',
									)}
									key={key}
								>
									<a className="link text-wrap" href={`#${slug(text)}`}>
										{text}
									</a>
								</li>
							))}
						</ul>
					</ScrollArea>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}
