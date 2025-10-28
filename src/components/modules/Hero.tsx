import Image from 'next/image'
import { cn } from '@/lib/utils'
import { PortableText } from '@portabletext/react'
import CTAList from '@/components/CTAList'
import lightray from '/public/lightrays3.svg'
import { Icon } from '@iconify-icon/react'
import { hero } from '@/components/portable-text'
import { ContainerScroll } from '@/components/animated/container-scroll-animation'
import { Img } from '@/components/Img'

import { Link } from '@/i18n/routing'

export default function Hero({
	pretitle,
	content,
	image,
	ctas,
	locale,
}: Partial<{
	pretitle?: {
		label?: string
		href?: string
	}
	content: any
	ctas: Sanity.CTA[]
	image: Sanity.Image
	locale: 'en' | 'ar'
}>) {
	return (
		<section
			className="-hero-background relative min-h-screen"
			style={{
				backgroundImage: `linear-gradient(to bottom, transparent, white), radial-gradient(ellipse at top center, #155e75 0%, #2dd4bf 60%, #ffffff 100%)`,
			}}
		>
			<div
				style={{ position: 'absolute', top: 0, height: '100%', width: '100%' }}
			>
				<Image
					src={lightray}
					alt="hero"
					className="pointer-events-none sticky top-0 right-0 left-0 mx-auto h-screen w-full object-cover mix-blend-overlay"
					draggable={false}
				/>
			</div>
			<div className="section relative flex w-full flex-col justify-center">
				<div className="relative space-y-6 pt-[25vh] text-center text-white">
					<div className="flex flex-col items-center justify-center gap-2 md:flex-row">
						{pretitle?.href ? (
							<Link
								href={pretitle.href}
								className="text-small flex w-fit grow-0 flex-row items-center gap-2 rounded-full bg-cyan-950/40 px-4 py-2 font-normal text-white hover:bg-cyan-950/60"
							>
								<Icon icon="ph:seal-check" className="text-xl" />
								<span>{pretitle.label}</span>
							</Link>
						) : (
							pretitle?.label && (
								<div className="text-small flex w-fit grow-0 flex-row items-center gap-2 rounded-full bg-cyan-950/40 px-4 py-2 font-normal text-white">
									<Icon icon="ph:seal-check" className="text-xl" />
									<span>{pretitle.label}</span>
								</div>
							)
						)}
					</div>

					<PortableText value={content} components={hero} />
					<CTAList
						ctas={ctas}
						className={cn('justify-center text-white *:h-12 *:px-6 *:text-lg')}
					/>
				</div>
				<ContainerScroll>
					<Img
						image={image}
						alt={image?.alt}
						className="mx-auto h-auto w-full rounded-lg object-cover"
						draggable={false}
						fetchPriority="high"
						priority
						loading="eager"
						sizes="(max-width: 1200px) 90vw, 1000px"
					/>
				</ContainerScroll>
			</div>
		</section>
	)
}
