import { Img } from '@/components/Img'
import { PortableText } from '@portabletext/react'
import Pretitle from '@/components/Pretitle'
import { cn } from '@/lib/utils'
import { motionComponents } from '@/components/portable-text'
import Media from '../Media'
import { ReactElement } from 'react'

export default function Brief({
	pretitle,
	content,
	image,
	animatedComponent,
	layout,
	// onRight,
	alignItems,
}: Partial<{
	pretitle: string
	content: any
	image: any
	animatedComponent?: ReactElement
	layout?: {
		direction?: 'row' | 'column'
		reverse?: boolean
		textAlign: React.CSSProperties['textAlign']
	}
	// onRight: boolean
	alignItems: React.CSSProperties['alignItems']
}>) {
	const direction = layout?.direction === 'column' ? 'column' : 'row'
	const isReverse = layout?.reverse ?? false
	const textAlign = layout?.textAlign ?? 'start'
	return (
		<section className={cn('section py-(--size--2rem)')}>
			<div
				className={cn(
					'fluid-gap grid w-full grid-cols-1 items-center',
					direction === 'row' ? 'lg:grid-cols-2' : 'lg:grid-cols-1',
				)}
			>
				{animatedComponent ? (
					animatedComponent
				) : (
					<Media
						image={image}
						className="relative w-full rounded-lg p-2 shadow-lg"
					/>
				)}
				<div
					data-onright={isReverse}
					className="flex flex-col gap-6 pe-6"
					style={{
						order: isReverse ? 1 : -1,
						textAlign,
					}}
				>
					<Pretitle className="text-base font-medium text-teal-500">
						{pretitle}
					</Pretitle>
					<PortableText value={content} components={motionComponents} />
				</div>
			</div>
		</section>
	)
}
