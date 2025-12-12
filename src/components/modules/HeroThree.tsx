import { Img } from '@/components/Img'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import CTAList from '@/components/CTAList'
import Pretitle from '../Pretitle'
import Image from 'next/image'
import blob from '/public/gradient-blob2.svg'
import * as m from 'motion/react-m'
import { Variants } from 'motion/react'

export default function HeroThree({
	pretitle,
	content,
	ctas,
	image,
}: Partial<{
	pretitle: any
	content: any
	ctas: Sanity.CTA[]
	image: Sanity.Image & { onRight?: boolean }
	textAlign: React.CSSProperties['textAlign']
	alignItems: React.CSSProperties['alignItems']
}>) {
	const FADE_DOWN_ANIMATION_VARIANTS: Variants = {
		hidden: { opacity: 0, y: -10 },
		visible: { opacity: 1, y: 0, transition: { type: 'spring' } },
	}

	const components: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				if (value.style === 'h1') {
					return (
						<m.h1
							layout
							className="h1 leading-tight font-semibold text-pretty text-cyan-950"
							variants={FADE_DOWN_ANIMATION_VARIANTS}
						>
							{value.children.map((child: any) => child.text).join('')}
						</m.h1>
					)
				}
				if (value.style === 'h2') {
					return (
						<m.h2
							layout
							className="text-large leading-tight font-semibold text-teal-600"
							variants={FADE_DOWN_ANIMATION_VARIANTS}
						>
							{value.children.map((child: any) => child.text).join('')}
						</m.h2>
					)
				}
				return (
					<m.p
						layout
						className="text-main mx-auto text-cyan-950/80 md:max-w-3xl"
						variants={FADE_DOWN_ANIMATION_VARIANTS}
					>
						{value.children.map((child: any) => child.text).join('')}
					</m.p>
				)
			},
		},
	}
	return (
		<section className="section bg-white max-lg:pt-16">
			<m.div
				className={
					'md:fluid-gap flex w-full flex-col items-center justify-evenly gap-8 lg:min-h-screen lg:flex-row'
				}
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
				<m.div
					className="h-auto w-full lg:max-w-[560px]"
					variants={FADE_DOWN_ANIMATION_VARIANTS}
					layout
				>
					<Img
						image={image}
						alt={image?.alt || pretitle}
						className="relative h-auto w-full overflow-hidden rounded-2xl border-8 border-white object-cover shadow-md lg:aspect-square lg:max-w-[560px]"
						draggable={false}
						priority
						fetchPriority="high"
						width={400}
					/>
				</m.div>
				<m.div layout className="flex flex-col items-start gap-6">
					<m.span layout variants={FADE_DOWN_ANIMATION_VARIANTS}>
						<Pretitle className="text-base font-medium text-gray-400">
							{pretitle}
						</Pretitle>
					</m.span>
					<PortableText value={content} components={components} />
					<CTAList
						ctas={ctas}
						className="mt-2 w-full *:h-12 *:text-lg *:max-md:w-full"
					/>
				</m.div>

				<Image
					src={blob}
					alt="hero"
					className="pointer-events-none absolute z-[-1] aspect-square h-full w-auto object-cover"
					draggable={false}
				/>
			</m.div>
		</section>
	)
}
