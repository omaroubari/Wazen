import * as React from 'react'
import { cn } from '@/lib/utils'
import processUrl from '@/lib/processUrl'
import { Link } from '@/i18n/routing'
import {
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Icon } from '@iconify-icon/react'

export default function LinkGroup({
	label,
	links,
	locale,
}: Sanity.LinkGroup & { locale: 'en' | 'ar' }) {
	const linkCount = links?.[0]?.links && links?.[0].links.length

	return (
		<NavigationMenuItem key={label} className="w-full">
			<NavigationMenuTrigger className="group relative">
				{label}
			</NavigationMenuTrigger>
			<NavigationMenuContent className="max-lg:w-full">
				<ul
					className={cn(
						'grid gap-1 p-4 md:w-[400px] md:grid-cols-2 md:gap-y-0 lg:w-[500px]',
						linkCount && linkCount < 6 ? 'md:grid-cols-1' : '',
					)}
				>
					{links?.[0].links?.map((item: any) => (
						<NavigationMenuItem key={item.label}>
							{/*<NavigationMenuLink asChild>*/}
							<Link
								className={cn(
									navigationMenuTriggerStyle(),
									item.iconify?.name && 'h-12 gap-2 px-2',
								)}
								href={
									item.type === 'internal'
										? processUrl(item.internal, {
												base: false,
												params: item.params,
											})
										: item.external
								}
							>
								{item.iconify?.name && (
									<div className="size-8 flex-none rounded-md bg-teal-50 p-1 transition-colors duration-200 group-hover:bg-cyan-800">
										<Icon
											icon={item.iconify.name}
											className="h-6 text-2xl text-teal-600 group-hover:text-teal-50"
										/>
									</div>
								)}
								{item.label || item.internal.title}
							</Link>
							{/*</NavigationMenuLink>*/}
						</NavigationMenuItem>
					))}
				</ul>
			</NavigationMenuContent>
		</NavigationMenuItem>
	)
}

const ListItem = React.forwardRef<
	React.ElementRef<'a'>,
	React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none',
						className,
					)}
					{...props}
				>
					<div className="text-sm leading-none font-medium">{title}</div>
					<p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	)
})
ListItem.displayName = 'ListItem'
