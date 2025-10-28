import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import CTAList from '@/components/CTAList'
import { cn } from '@/lib/utils'
import { Icon } from '@iconify-icon/react'

import { Img } from '@/components/Img'
import { CallToActionDoc } from 'sanity'

export default function CallToAction({
	content,
	ctas,
	image,
	checkedList,
	callToActionDoc,
	className,
}: Sanity.Module & { className?: string }) {
	// Return null or placeholder if essential content is missing

	if (!content && !ctas) {
		content = callToActionDoc.content
		ctas = callToActionDoc.ctas
		image = callToActionDoc.image
		checkedList = callToActionDoc.checkedList
	}

	const components: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				if (value.style === 'h2') {
					return (
						<h2 className="h2 leading-tight font-semibold text-cyan-950">
							{value.children.map((child: any) => child.text).join('')}
						</h2>
					)
				} else if (value.style === 'h3') {
					return (
						<p className="text-large leading-tight font-semibold text-cyan-950">
							{value.children.map((child: any) => child.text).join('')}
						</p>
					)
				}
				return (
					<p className="text-large max-w-xl text-gray-600 md:max-w-3xl">
						{value.children.map((child: any) => child.text).join('')}
					</p>
				)
			},
		},
	}

	const checkedListComponents: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				const textContent = value.children
					.map((child: any) => child.text)
					.join('')
				if (!textContent.trim()) return null // Do not render if text content is empty or just whitespace

				return (
					<div className="flex items-center gap-2">
						<Icon
							icon="ph:check-circle"
							className="size-5 text-teal-500"
							height="none"
						/>
						<p className="text-gray-600">{textContent}</p>
					</div>
				)
			},
		},
	}

	return (
		<section className={cn(`section fluid-padding`, className)}>
			<div
				className={cn(
					'fluid-gap fluid-padding -cyan-gradient-background-1 relative flex w-full flex-col items-center justify-evenly overflow-hidden rounded-2xl bg-cyan-50 lg:flex-row lg:justify-start',
					image?.onRight ? '' : 'lg:flex-row-reverse lg:justify-between',
				)}
			>
				{/* Only render image section if image data exists */}
				{image?.asset && (
					<div className="relative aspect-square w-full overflow-hidden rounded-2xl border-8 border-white bg-teal-500 lg:max-w-[400px]">
						<div
							className={cn(
								'absolute start-8 top-8 h-full w-full min-w-[800px]',
							)}
						>
							<Img
								image={image}
								alt={image?.alt || ''} // Provide default alt text
								className="mx-auto h-full w-full rounded-lg object-cover shadow-lg ltr:object-top-left rtl:object-top-right"
								draggable={false}
								loading="lazy"
							/>
						</div>
					</div>
				)}
				<div className="flex max-w-2xl flex-col items-start gap-8">
					{content && <PortableText value={content} components={components} />}

					{ctas && (
						<CTAList ctas={ctas as any} className="w-full *:h-12 *:text-base" />
					)}
					{checkedList && (
						<div className="flex flex-col gap-2">
							<PortableText
								value={checkedList}
								components={checkedListComponents}
							/>
						</div>
					)}
				</div>
			</div>
		</section>
	)
}
