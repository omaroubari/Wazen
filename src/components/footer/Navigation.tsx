import { Link } from '@/i18n/routing'
import Button from '../LinkButton'
import { Icon } from '@iconify-icon/react'
import { cn } from '@/lib/utils'
import { getTranslations } from 'next-intl/server'
import Logo from '@/components/logo'

export default async function Menu({ footerMenu, locale, contactInfo }: any) {
	const t = await getTranslations('Index')
	const icons = [
		<Icon
			icon="ph:phone"
			key="PiPhone"
			className="flex-none text-center text-base leading-none text-white"
		/>,
		<Icon
			icon="ph:envelope"
			key="PiEnvelope"
			className="flex-none text-center text-base leading-none text-white"
		/>,
		<Icon
			icon="ph:map-pin-line"
			key="PiMapPin"
			className="flex-none text-center text-base leading-none text-white"
		/>,
	]

	return (
		<nav className="fluid-gap flex w-full flex-col flex-wrap items-start justify-start font-medium md:grid md:grid-cols-2 md:justify-around lg:grid-cols-5">
			<div className="flex flex-col justify-start text-start text-sm font-normal lg:row-span-2">
				<Link
					className="mb-4 h-10 font-bold"
					href="/"
					aria-label={locale == 'en' ? 'Homepage' : 'الصفحة الرئيسية'}
				>
					<Logo className="h-6 w-auto" locale={locale} light />
				</Link>
				<p className="flex h-10 items-center font-medium text-balance">
					{t('The OS for your Business')}
				</p>
				{contactInfo?.map(
					(item: { link: Sanity.Link; title: any }, index: number) => {
						if (item.link.external)
							return (
								<span
									key={index}
									className="flex h-10 flex-row items-center gap-2 text-white/60"
								>
									{icons[index]}

									<Button link={item.link} className="hover:text-white" />
								</span>
							)
					},
				)}
			</div>
			{footerMenu?.items?.map((item: any, key: any) => {
				const { label, links } = item
				return (
					<div
						key={key}
						
						className={links.length > 9 ? 'col-span-2' : 'col-span-1'}
					>
						<div className="grid h-10 items-center rounded text-start text-sm text-white">
							{label}
						</div>
						<ul
							className={cn(
								'grid grid-cols-1 text-start',
								links.length > 9 ? 'grid-cols-2 gap-x-4 lg:gap-x-12' : '',
							)}
						>
							{links?.map((link: any, key: any) => (
								<li key={key} className={cn('group')}>
									<Button
										locale={locale}
										link={link}
										className="grid h-10 items-center text-sm text-white/60 no-underline transition-colors group-hover:text-white"
									>
										{link.label}
									</Button>
									{/* <Icon icon='ph:caret-left-bold' className="size-3 translate-x-0 text-gray-50/50 opacity-0 transition-transform duration-300 group-hover:-translate-x-1 group-hover:opacity-100 ltr:rotate-180 ltr:group-hover:translate-x-1" /> */}
								</li>
							))}
						</ul>
					</div>
				)
			})}
		</nav>
	)
}
