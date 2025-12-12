import Button from '../../LinkButton'
import { Icon } from '@iconify-icon/react'

export default function ContactBar({
	contactInfo,
	locale,
}: Partial<{
	contactInfo: any
	locale: 'en' | 'ar'
}>) {
	const icons = [
		<Icon icon="ph:phone" key="PiPhone" className="text-base text-gray-400" />,
		<Icon
			icon="ph:envelope"
			key="PiEnvelope"
			className="text-base text-gray-400"
		/>,
		<Icon
			icon="ph:map-pin"
			key="PiMapPin"
			className="text-base text-gray-400"
		/>,
	]

	return (
		<div id="contactBar" className="h-9 w-full bg-gray-50">
			<div className="section flex flex-row justify-end gap-2 py-1">
				<span className="w-full grow-1 py-1 text-sm font-medium text-gray-500">
					{locale == 'ar' ? 'تواصل معنا' : 'Get in touch with us'}
				</span>
				{contactInfo?.map(
					(item: { link: Sanity.Link; title: any }, index: number) => {
						if (item.link.external)
							return (
								<div
									key={index}
									className="flex shrink-0 flex-row items-center gap-1 px-2 py-1"
								>
									{icons[index]}
									<Button
										link={item.link}
										variant="link"
										className="h-fit p-0 text-sm font-normal text-cyan-950/60 hover:text-teal-600"
									/>
								</div>
							)
					},
				)}
			</div>
		</div>
	)
}
