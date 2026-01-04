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
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/lib/motion'
import { Icon } from '@iconify-icon/react'

export default function HeroFive({
	pretitle,
	content,
	ctas,
	image,
	list,
	properties,
}: Partial<{
	pretitle: any
	content: any
	ctas: Sanity.CTA[]
	image: Sanity.Image & { onRight?: boolean }
	list: { title: string; subtitle: string; icon: { name: string } }[]
	properties: { title: string; subtitle: string; label: string }[]
	textAlign: React.CSSProperties['textAlign']
	alignItems: React.CSSProperties['alignItems']
}>) {
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
						className="text-main mx-auto text-cyan-950/80"
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
					'fluid-gap grid w-full grid-cols-1 place-content-center gap-8 md:grid-cols-4 lg:min-h-screen'
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
					layout
					className="flex flex-col items-start justify-center gap-6 md:col-span-3 md:max-w-3xl"
				>
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
					{list && (
						<ul className="mt-4 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
							{list.map(({ title, subtitle, icon }) => (
								<li
									key={title}
									className="_bg-white _shadow-lg flex items-start gap-2 rounded-2xl p-4 pe-6 outline-1 outline-cyan-950/20"
								>
									{/* <Icon
										icon={icon.name}
										className="size-[1lh] text-teal-600"
										height="none"
									/> */}
									<div>
										<p className="mb-1 block text-lg font-semibold text-cyan-950">
											{title}
										</p>
										<p className="block text-sm text-gray-600">{subtitle}</p>
									</div>
								</li>
							))}
						</ul>
					)}
				</m.div>
				<div>
					{properties?.map(({ label, title, subtitle }) => (
						<div
							key={label}
							className="mb-4 rounded-2xl bg-white px-6 py-4 pe-8 shadow-lg outline-1 outline-cyan-950/5"
						>
							<span className="mb-2 block text-sm font-medium text-gray-500">
								{label}
							</span>
							<p className="block text-lg font-semibold text-cyan-950">
								{title}
							</p>
							<p className="block text-sm text-gray-600">{subtitle}</p>
						</div>
					))}
				</div>
			</m.div>
		</section>
	)
}
