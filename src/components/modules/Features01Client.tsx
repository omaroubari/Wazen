'use client'
import { useRef } from 'react'
import { useInView, Variants } from 'motion/react'
import * as m from 'motion/react-m'
import { Icon } from '@iconify-icon/react'
import { Img } from '@/components/Img'

type Feature = {
	icon: { name: string }
	image: Sanity.Image
	title: string
	description: string
}

const FADE_UP_ANIMATION_VARIANTS: Variants = {
	hidden: { opacity: 0, y: 10 },
	show: { opacity: 1, y: 0, transition: { type: 'spring' } },
}

const FeatureItem = ({ feature }: { feature: Feature }) => (
	<m.li
		className="group flex max-h-[400px] w-full flex-col justify-start overflow-hidden rounded-xl text-start hover:bg-teal-100 lg:max-h-[500px]"
		variants={FADE_UP_ANIMATION_VARIANTS}
	>
		<div className="space-y-2 p-6">
			<div className="flex flex-row items-center gap-4">
				{feature.icon && (
					<div className="self-start rounded-md bg-cyan-800 p-2">
						<Icon
							icon={feature.icon.name}
							className="text-xl leading-none text-cyan-50"
						/>
					</div>
				)}
				<h3 className="text-large font-semibold text-cyan-950 ltr:leading-tight">
					{feature.title}
				</h3>
			</div>
			<p className="text-base text-pretty text-cyan-950/80">
				{feature.description}
			</p>
		</div>
		<Img
			image={feature.image}
			alt={feature.title}
			className="h-auto w-full translate-y-0 scale-[99%] px-6 opacity-90 transition-all ease-out group-hover:-translate-y-1 group-hover:scale-100 group-hover:opacity-100 group-hover:drop-shadow-lg"
		/>
	</m.li>
)

export default function FeatureBlock({ features }: { features: Feature[] }) {
	const ref = useRef<HTMLDivElement>(null)
	const isInView = useInView(ref)

	return (
		<div ref={ref}>
			<m.ul
				className="grid w-full grid-flow-row gap-6 *:bg-cyan-950/10 md:grid-flow-col"
				initial="hidden"
				animate={isInView ? 'show' : 'hidden'}
				viewport={{ once: true }}
				variants={{
					hidden: {},
					show: {
						transition: {
							staggerChildren: 0.15,
						},
					},
				}}
			>
				{features.map((feature) => (
					<FeatureItem key={feature.title} feature={feature} />
				))}
			</m.ul>
		</div>
	)
}
