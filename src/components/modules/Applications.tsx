import dynamic from 'next/dynamic'
import { PortableText } from '@portabletext/react'
import Pretitle from '@/components/Pretitle'
import { defaultComponents } from '@/components/portable-text'
const InfiniteMovingCards = dynamic(
	() =>
		import('@/components/animated/infinite-moving-cards-apps').then(
			(mod) => mod.default,
		),
	{
		ssr: false,
	},
)

export default function Applications({
	pretitle,
	content,
	cards,
	locale,
	ctas,
	textAlign = 'center',
	alignItems,
}: Partial<{
	pretitle: string
	content: any
	cards: any
	locale: 'en' | 'ar'
	ctas: any
	textAlign: React.CSSProperties['textAlign']
	alignItems: React.CSSProperties['alignItems']
}>) {
	const direction = locale === 'en' ? 'ltr' : 'rtl'
	return (
		<section
			className={
				'fluid-vertical-space fluid-gap flex min-h-screen w-full flex-col items-center justify-evenly overflow-hidden'
			}
		>
			<div className="section flex flex-col items-center gap-6 text-center">
				<Pretitle className="text-base font-medium text-teal-500">
					{pretitle}
				</Pretitle>
				<PortableText value={content} components={defaultComponents} />
			</div>
			<InfiniteMovingCards items={cards} />
		</section>
	)
}
