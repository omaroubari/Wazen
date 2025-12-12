import dynamic from 'next/dynamic'
import { PortableText } from '@portabletext/react'
import Pretitle from '@/components/Pretitle'
import { motionComponents } from '@/components/portable-text'
import { useTranslations } from 'next-intl'
import ComparisonTable from './ComparisonTable'
import { useMemo } from 'react'

const InfiniteMovingCards = dynamic(
	() => import('@/components/animated/infinite-moving-cards-apps'),
)

export default function Applications({
	pretitle,
	content,
	cards,
	locale,
	altApps,
	ctas,
	textAlign = 'center',
	alignItems,
}: Partial<{
	pretitle: string
	content: any
	cards: any
	locale: 'en' | 'ar'
	altApps: any
	ctas: any
	textAlign: React.CSSProperties['textAlign']
	alignItems: React.CSSProperties['alignItems']
}>) {
	const t = useTranslations('FeaturesInfiniteScroll')
	const features = useMemo(() => {
		return [
			{
				title: t('Check in and check out'),
				icon: 'ph:user-check',
			},
			{
				title: t('Employee info'),
				icon: 'ph:identification-card',
			},
			{
				title: t('Housing and accomodation'),
				icon: 'ph:building-office',
			},
			{
				title: t('Insurance'),
				icon: 'ph:shield-check',
			},
			{
				title: t('Salaries'),
				icon: 'ph:money',
			},

			{
				title: t('Leads'),
				icon: 'ph:flag-pennant',
			},
			{
				title: t('Contracts'),
				icon: 'ph:scroll',
			},
			{
				title: t('Subscriptions'),
				icon: 'ph:calendar-dots',
			},
			{
				title: t('Clients'),
				icon: 'ph:user-rectangle',
			},
			{
				title: t('SMS and Whatsapp'),
				icon: 'ph:chat-circle-text',
			},

			{
				title: t('Sales'),
				icon: 'ph:money',
			},
			{
				title: t('Purchases'),
				icon: 'ph:shopping-cart',
			},
			{
				title: t('Inventory'),
				icon: 'ph:warehouse',
			},
			{
				title: t('Financial lists'),
				icon: 'ph:invoice',
			},
			{
				title: t('Cost centers'),
				icon: 'ph:chart-pie',
			},
		]
	}, [t])
	return (
		<section
			className={
				'fluid-vertical-space fluid-gap flex min-h-screen w-full flex-col items-center justify-evenly overflow-hidden'
			}
		>
			<div
				className={
					'section mx-auto flex max-w-xl flex-col items-center gap-6 text-center md:max-w-3xl'
				}
			>
				<Pretitle className="text-large font-semibold text-gray-400">
					{pretitle}
				</Pretitle>
				<PortableText value={content} components={motionComponents} />
			</div>
			<div className="w-full space-y-2">
				<InfiniteMovingCards items={features.slice(0, 5)} />
				<InfiniteMovingCards reverse items={features.slice(5, 10)} />
				<InfiniteMovingCards items={features.slice(10, 15)} />
			</div>
			<ComparisonTable {...altApps} />
		</section>
	)
}
