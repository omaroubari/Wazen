import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import YoutubeEmbed from '@/components/ui/youtube-embed'
import NextImage from 'next/image'
import { Img } from './Img'
import {
	internalGroqTypeReferenceTo,
	SanityImageCrop,
	SanityImageHotspot,
} from '@/sanity/types'
import { ReactElement } from 'react'
import { Button } from './ui/button'
import { Icon } from '@iconify-icon/react/dist/iconify.mjs'

const getYoutubeId = (link?: string) => {
	if (!link) return null
	try {
		const url = new URL(link)
		if (url.searchParams.get('v')) return url.searchParams.get('v')
		const pathId = url.pathname.split('/').filter(Boolean).pop()
		return pathId || null
	} catch {
		return null
	}
}

export default function Media({
	className,
	image,
}: {
	className?: string
	image: {
		asset?: {
			_ref: string
			_type: 'reference'
			_weak?: boolean
			[internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
		}
		media?: unknown
		hotspot?: SanityImageHotspot
		crop?: SanityImageCrop
		alt?: string
		youtubeLink?: string
		loading?: 'lazy' | 'eager'
		_type: 'image'
	}
}) {
	const videoId = getYoutubeId(image.youtubeLink)

	if (videoId) {
		return (
			<div className="relative">
				{'asset' in image ? (
					<Img image={image} className={className} />
				) : (
					<NextImage
						className={className}
						src={`https://i.ytimg.com/vi_webp/${videoId}/sddefault.webp`}
						width={640}
						height={480}
						alt=""
					/>
				)}
				<Dialog>
					<DialogTrigger asChild>
						<Button
							className="absolute inset-0 m-auto w-fit"
							variant="secondary"
							size="lg"
						>
							<Icon icon="ph:play-duotone" height="none" className="size-6" />
						</Button>
					</DialogTrigger>
					<DialogContent className="w-[calc(100vw-2rem)] max-w-(--container-7xl) bg-white p-4">
						{/*<DialogHeader>
				<DialogTitle>DialogTitle</DialogTitle>
				<DialogDescription>
				DialogDescription
				</DialogDescription>
			</DialogHeader>*/}
						<YoutubeEmbed id={videoId} />
						<DialogFooter className="sm:justify-center">
							<p className="text-center text-sm text-gray-500">
								If you see “Sign in to confirm you’re not a bot”, try{' '}
								<a
									href={image.youtubeLink}
									target="_blank"
									rel="noreferrer"
									className="text-teal-600 underline"
								>
									opening the video directly on YouTube
								</a>
								.
							</p>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		)
	}
	if ('asset' in image) {
		return <Img image={image} className={className} />
	}
	return null
}
