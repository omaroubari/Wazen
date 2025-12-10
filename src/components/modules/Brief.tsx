import { Img } from '@/components/Img'
import { PortableText } from '@portabletext/react'
import Pretitle from '@/components/Pretitle'
import { cn } from '@/lib/utils'
import { set2 } from '@/components/portable-text'
import Media from '../Media'
import { ReactElement } from 'react'

export default function Brief({
	pretitle,
	content,
	image,
	animatedComponent,
	onRight,
	textAlign = 'center',
	alignItems,
}: Partial<{
	pretitle: string
	content: any
	image: any
	animatedComponent?: ReactElement
	onRight: boolean
	textAlign: React.CSSProperties['textAlign']
	alignItems: React.CSSProperties['alignItems']
}>) {
	return (
		<section className={cn('section py-(--size--2rem)')}>
			<div className="fluid-gap grid w-full grid-cols-1 items-center lg:grid-cols-2">
				<Media
					image={image}
					animatedComponent={animatedComponent}
					className="relative w-full rounded-lg p-2 shadow-lg"
				/>
				<div
					data-onright={onRight}
					className="flex flex-col gap-6 pe-6"
					style={{
						order: onRight ? -1 : undefined,
					}}
				>
					<Pretitle className="text-base font-medium text-teal-500">
						{pretitle}
					</Pretitle>
					<PortableText value={content} components={set2} />
				</div>
			</div>
		</section>
	)
}
