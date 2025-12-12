import { cn } from '@/lib/utils'
import { Icon } from '@iconify-icon/react'
import Pretitle from '../Pretitle'
import { PortableText } from 'next-sanity'
import CTAList from '../CTAList'
import { defaultComponents } from '../portable-text'

export default function List01({
	pretitle,
	content,
	ctas,
	gridLayout,
	features,
}: Partial<{
	pretitle: string
	content: any
	Subtitle: any
	ctas: any
	gridLayout: '2x2' | '3x3' | '4x4'
	features: { title: string; description: string; icon: { name: string } }[]
	textAlign: React.CSSProperties['textAlign']
}>) {
	return (
		<section className="section flex bg-white py-(--size--4rem)">
			<div className="flex flex-col items-center gap-6">
				<Pretitle className="text-large font-semibold text-teal-100">
					{pretitle}
				</Pretitle>
				<PortableText value={content} components={defaultComponents} />
			</div>

			{ctas && (
				<div className="text-center">
					<CTAList ctas={ctas} />
				</div>
			)}

			<ul
				className={cn(
					'mx-auto grid w-full',
					gridLayout === '2x2' && 'grid-cols-2',
					gridLayout === '3x3' && 'grid-cols-1 lg:grid-cols-3',
					gridLayout === '4x4' && 'grid-cols-2 lg:grid-cols-4',
				)}
			>
				{features &&
					features.map(
						(
							feature: {
								title: string
								description: string
								icon: { name: string }
							},
							index: any,
						) => (
							<li
								className="flex w-full flex-col justify-start gap-4 rounded-xl p-4 text-start"
								key={index}
							>
								<div className="size-14 self-start rounded-full bg-cyan-50 p-4">
									<Icon
										icon={feature.icon ? feature.icon.name : 'ph:cube-duotone'}
										className="text-2xl leading-none text-teal-600"
									/>
								</div>
								<h3 className="text-large leading-tight font-semibold text-cyan-950">
									{feature.title}
								</h3>
								<p className="text-main max-w-xl text-cyan-950/80 md:max-w-3xl">
									{feature.description}
								</p>
							</li>
						),
					)}
			</ul>
		</section>
	)
}
