import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import CTAList from '@/components/CTAList'
import { cn } from '@/lib/utils'
import { Icon } from '@iconify-icon/react'

import { Img } from '@/components/Img'
import { CallToActionDoc } from '@/sanity/types'
import { InfiniteSlider } from '@/components/ui/infinite-slider'

// Component is now simpler, receives all data via props
export default function BlogPostCallToAction({
	content,
	ctas,
	image,
	checkedList,
	className,
}: Sanity.CallToActionDoc & { className?: string }) {
	// Return null or placeholder if essential content is missing
	if (!content && !ctas) {
		return null
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
					<div className="flex flex-shrink-0 items-center gap-2 rtl:flex-row-reverse">
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
		<section
			className={cn(
				`fluid-padding w-full max-w-full overflow-hidden`,
				className,
			)}
		>
			<div className="fluid-gap fluid-padding flex w-full flex-col items-center justify-evenly rounded-2xl bg-cyan-50">
				<div className="flex w-full flex-col items-start gap-8">
					<div className="flex flex-col gap-4">
						{content && (
							<PortableText value={content} components={components} />
						)}
					</div>

					{ctas && (
						<CTAList ctas={ctas as any} className="w-full *:h-12 *:text-base" />
					)}
				</div>
				{checkedList && (
					<InfiniteSlider gap={24} className="flex" speedOnHover={20}>
						<PortableText
							value={checkedList}
							components={checkedListComponents}
						/>
					</InfiniteSlider>
				)}
			</div>
		</section>
	)
}
