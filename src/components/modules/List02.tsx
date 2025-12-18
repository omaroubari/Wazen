import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import Pretitle from '@/components/Pretitle'
import CTAList from '../CTAList'
import { Icon } from '@iconify-icon/react'
import { cn } from '@/lib/utils'
import { defaultComponents } from '../portable-text'

export default async function List02({
	pretitle,
	content,
	ctas,
	gridLayout = '3x3',
	features,
	layout,
}: Partial<{
	pretitle: string
	content: any
	Subtitle: any
	ctas: any
	gridLayout: '2x2' | '3x3' | '4x4'
	features: { title: string; description: string; icon: { name: string } }[]
	layout: { textAlign: React.CSSProperties['textAlign'] }
}>) {
	const textAlign = layout?.textAlign ?? 'center'
	return (
		<section data-theme="dark" className="bg-cyan-950">
			<div
				className="fluid-gap section fluid-padding flex w-full flex-col items-center py-(--size--6rem)"
				style={{ textAlign } as React.CSSProperties}
			>
				<div className="flex flex-col items-center gap-6">
					<Pretitle className="font-semibold text-teal-100">
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
						'grid w-full place-content-center justify-items-center gap-6 [&>*:nth-child(even)]:bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))]',
						gridLayout === '2x2' && 'grid-cols-2',
						gridLayout === '3x3' && 'grid-cols-1 lg:grid-cols-3',
						gridLayout === '4x4' && 'grid-cols-2 lg:grid-cols-4',
					)}
				>
					{features &&
						features.map(
							({ title, description, icon: { name } }, index: any) => (
								<li
									className="flex w-full flex-col justify-start gap-2 rounded-xl p-4 text-start"
									key={index}
								>
									<div className="mb-2 size-9 self-start rounded-md bg-teal-700 p-2">
										<Icon
											icon={name ? name : 'ph:cube-duotone'}
											className="text-xl leading-none text-white"
										/>
									</div>
									<h3 className="text-main leading-tight font-semibold text-teal-50">
										{title}
									</h3>
									<p className="text-main max-w-xl text-white/80 md:max-w-3xl">
										{description}
									</p>
								</li>
							),
						)}
				</ul>
			</div>
		</section>
	)
}
