import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import Pretitle from '@/components/Pretitle'
import CTAList from '@/components/CTAList'
import { Img } from '@/components/Img'
import { motionComponents } from '@/components/portable-text'
import * as m from 'motion/react-m'
import { Variants } from 'motion/react'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/lib/motion'
import Media from '../Media'

export default function Hero04({
	pretitle,
	content,
	ctas,
	image,
}: Partial<{
	pretitle: string
	content: any
	ctas: Sanity.CTA[]
	image: Sanity.Image
}>) {
	return (
		<m.section
			className="cyan-gradient-background-2 relative flex  flex-col gap-6 pt-[20vh] lg:gap-12"
			// className="cyan-gradient-background-2 relative flex min-h-screen flex-col gap-6 py-[20vh] lg:gap-12"
			initial="hidden"
			animate="visible"
			viewport={{ once: true }}
			variants={{
				hidden: {},
				visible: {
					transition: {
						staggerChildren: 0.15,
					},
				},
			}}
		>
			<div className="relative mx-auto flex w-full max-w-(--breakpoint-xl) flex-col items-center justify-center gap-6 px-(--padding-horizontal--main) text-center">
				<Pretitle className="mb-2 text-base font-medium text-teal-500">
					{pretitle}
				</Pretitle>
				<PortableText value={content} components={motionComponents} />
				<CTAList
					ctas={ctas}
					className="mt-2 *:h-12 *:px-6 *:text-lg max-md:w-full"
				/>
			</div>
			{image && (
				<m.div
					variants={FADE_DOWN_ANIMATION_VARIANTS}
					className="section relative mx-auto h-auto w-full"
				>
					<Media
						image={image}
						className="h-auto w-full object-cover object-top-left"
					/>
					{/*<Img
						image={image}
						alt={image?.alt}
						className="h-auto w-full object-cover object-top-left"
						draggable={false}
						fetchPriority="high"
						loading="eager"
						priority
					/>*/}
				</m.div>
			)}
		</m.section>
	)
}
