'use client'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import CTAList from '../CTAList'
import { Icon } from '@iconify-icon/react/dist/iconify.mjs'
import { motionComponents } from '../portable-text'
import * as m from 'motion/react-m'
import { CONTAINER_VARIANTS, FADE_DOWN_ANIMATION_VARIANTS } from '@/lib/motion'
import Pretitle from '../Pretitle'

export default function CallToActionTwo({
	pretitle,
	content,
	ctas,
	image,
	microcopy,
	checkedList,
	callToActionDoc,
	className,
}: Sanity.Module & { className?: string }) {
	const checkedListComponents: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				const textContent = value.children
					.map((child: any) => child.text)
					.join('')
				if (!textContent.trim()) return null // Do not render if text content is empty or just whitespace
				return (
					<m.p
						variants={FADE_DOWN_ANIMATION_VARIANTS}
						className="flex flex-row items-start gap-3 text-sm leading-relaxed text-cyan-950/80 sm:text-base md:text-lg dark:text-white/80"
					>
						<Icon
							icon="ph:check-circle-duotone"
							height="none"
							className="size-[1lh] text-cyan-950/80 dark:text-white"
						/>
						<span>{textContent}</span>
					</m.p>
				)
			},
		},
	}
	if (!content && !ctas) {
		content = callToActionDoc.content
		ctas = callToActionDoc.ctas
		image = callToActionDoc.image
		checkedList = callToActionDoc.checkedList
		pretitle = callToActionDoc.pretitle
		microcopy = callToActionDoc.microcopy
	}
	return (
		<m.section
			className="section dark fluid-padding relative isolate"
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.3 }}
			variants={CONTAINER_VARIANTS}
		>
			<div className="fluid-padding relative z-1 overflow-hidden rounded-3xl bg-gradient-to-br from-teal-700 via-cyan-800 to-teal-900 shadow-2xl">
				<div
					className="absolute inset-0"
					style={{
						background:
							'linear-gradient(to bottom right, #152840, transparent, #152840)',
						mixBlendMode: 'hard-light',
					}}
				/>

				<div className="relative z-2 grid gap-6 p-2 sm:gap-8 lg:grid-cols-2 lg:gap-12">
					<div
						className="flex flex-col justify-center space-y-4 sm:space-y-5 md:space-y-6"
						// style={{ textAlign, alignItems }}
					>
						{content && (
							<div className="flex flex-col gap-6 pe-6">
								{pretitle && (
									<Pretitle className="text-base font-medium text-teal-500">
										{pretitle}
									</Pretitle>
								)}
								<PortableText value={content} components={motionComponents} />
							</div>
						)}

						{ctas && (
							<CTAList
								ctas={ctas as any}
								className="w-full *:h-12 *:text-base"
							/>
						)}
						{microcopy && (
							<p className="text-sm text-cyan-950/60 dark:text-white/60">
								{microcopy}
							</p>
						)}
					</div>

					{checkedList && (
						<div className="mt-6 flex flex-col justify-center space-y-3 sm:space-y-4 lg:mt-0">
							<PortableText
								value={checkedList}
								components={checkedListComponents}
							/>
						</div>
					)}
				</div>
			</div>
		</m.section>
	)
}
