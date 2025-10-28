'use client'

import { useEffect, useState } from 'react'
import { useMediaQuery } from '@/hooks/use-media-query'

import { cn } from '@/lib/utils'
import dynamic from 'next/dynamic'
import { useMotionValueEvent, useScroll } from 'motion/react'

const ContactBar = dynamic(() => import('./Desktop/ContactBar'), { ssr: true })
export default function Wrapper({
	className,
	children,
	contactInfo,
	locale,
}: {
	contactInfo: any
	locale: 'en' | 'ar'
} & React.HTMLAttributes<HTMLDivElement>) {
	const { scrollY } = useScroll()
	const [scrollPosition, setScrollPosition] = useState(0)
	const isDesktop = useMediaQuery('(min-width: 1280px)')

	const headerHeight = isDesktop ? 72 : 64
	// 	const contactBarHeight = isDesktop ? 36 : 0

	// useEffect(() => {
	// 	const adjustedHeight =
	// 		scrollPosition > 1 ? headerHeight - contactBarHeight : headerHeight
	// 	document.documentElement.style.setProperty(
	// 		'--header-height',
	// 		adjustedHeight + 'px',
	// 	)
	// }, [isDesktop, scrollPosition])

	useMotionValueEvent(scrollY, 'change', (latest) => {
		setScrollPosition(latest)
	})

	return (
		<div
			className={cn(
				className,
				'transition-transform duration-200 ease-in-out',
				scrollPosition > 1 && 'shadow-xs xl:-translate-y-9',
			)}
		>
			{isDesktop && <ContactBar contactInfo={contactInfo} locale={locale} />}
			{children}
		</div>
	)
}
