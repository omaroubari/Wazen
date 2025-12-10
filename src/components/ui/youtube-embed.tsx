'use client'
import { cn } from '@/lib/utils'

import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

export default function YoutubeEmbed({
	id,
	className,
}: {
	id: string
	className?: string
}) {
	return (
		<div className={cn('aspect-video h-auto w-full', className)}>
			<LiteYouTubeEmbed
				title="video"
				id={id}
				// params="autoplay=1&mute=1"
				aspectHeight={9}
				aspectWidth={16}
				cookie={true}
			/>
		</div>
	)
}
