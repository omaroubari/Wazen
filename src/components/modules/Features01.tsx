import { PortableText, PortableTextComponents } from '@portabletext/react'
import FeatureBlock from './Features01Client'

import Pretitle from '@/components/Pretitle'

type Feature = {
	icon: { name: string }
	image: Sanity.Image
	title: string
	description: string
}

type FeaturesGridTwoProps = {
	pretitle?: string
	content?: any
	ctas?: any
	features?: { features: Feature[] }[]
	textAlign?: React.CSSProperties['textAlign']
}

const portableTextComponents: PortableTextComponents = {
	block: ({ value }) => {
		const text = value.children.map((child: any) => child.text).join('')
		if (value.style === 'h2') {
			return (
				<h2 className="h2 leading-tight font-semibold text-cyan-950">{text}</h2>
			)
		}
		return (
			<p className="text-main mx-auto max-w-xl text-gray-600 md:max-w-3xl">
				{text}
			</p>
		)
	},
}

export default function FeaturesGridTwo({
	pretitle,
	content,
	features,
	textAlign = 'center',
}: FeaturesGridTwoProps) {
	return (
		<section className="bg-teal-400/10 py-(--size--4rem)">
			<div className="section fluid-padding fluid-gap fluid-padding flex w-full flex-col items-center justify-center rounded-2xl bg-white">
				<div className="flex flex-col items-center gap-6">
					<Pretitle className="text-large font-semibold text-teal-500">
						{pretitle}
					</Pretitle>
					<PortableText value={content} components={portableTextComponents} />
				</div>
				<div className="flex flex-col gap-6">
					{features?.map((block, index) => (
						<FeatureBlock key={index} features={block.features} />
					))}
				</div>
			</div>
		</section>
	)
}
