import { ReactElement } from 'react'
import Image from 'next/image'
import { getImageDimensions } from '@sanity/asset-utils'
import { urlFor } from '@/sanity/lib/urlFor'

export const Img = ({
	image,
	className,
	alt,
	width,
	height,
	sizes,
	loading,
	priority,
	quality,
	placeholder,
	style,
	onLoad,
	onError,
	draggable,
	fetchPriority,
}: {
	image: any
	className?: React.HTMLAttributes<HTMLImageElement>['className']
	alt?: string
	width?: number
	height?: number
	sizes?: string
	loading?: 'lazy' | 'eager'
	priority?: boolean
	quality?: number
	placeholder?: 'blur' | 'empty'
	style?: React.CSSProperties
	onLoad?: React.ReactEventHandler<HTMLImageElement>
	onError?: React.ReactEventHandler<HTMLImageElement>
	draggable?: boolean
	fetchPriority?: 'high' | 'low' | 'auto'
	fill?: boolean
} & Omit<
	React.ComponentProps<typeof Image>,
	| 'src'
	| 'width'
	| 'height'
	| 'blurDataURL'
	| 'placeholder'
	| 'alt'
	| 'className'
>) => {
	const altText = alt ?? image?.alt ?? 'An image without an alt, whoops'
	return (
		<>
			{image?.asset && (
				<Image
					src={urlFor(image).url()}
					alt={altText}
					width={width ?? getImageDimensions(image).width}
					height={height ?? getImageDimensions(image).height}
					placeholder="blur"
					blurDataURL={urlFor(image).width(24).height(24).blur(10).url()}
					sizes={
						sizes
						// ?? '(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 33vw'
					}
					className={className}
					loading={loading}
					priority={priority}
					quality={quality}
					style={style}
					onLoad={onLoad}
					onError={onError}
					draggable={draggable}
					fetchPriority={fetchPriority}
				/>
			)}
		</>
	)
}
