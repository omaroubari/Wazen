import ContactForm from '@/components/contact-form'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import { Link } from '@/i18n/routing'

import { Icon } from '@iconify-icon/react'

import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import processUrl from '@/lib/processUrl'

export default async function ContactUs({
	content,
	contactInfo,
	locale,
}: Partial<{
	content: any
	contactInfo: any
	locale: any
}>) {
	const messages = await getMessages()

	const components: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				if (value.style === 'h1') {
					return (
						<h1 className="h1 max-w-3xl text-start text-cyan-950 ltr:leading-tight rtl:leading-snug">
							{value.children.map((child: any) => child.text).join('')}
						</h1>
					)
				}
				if (value.style === 'h4') {
					return (
						<p className="text-large font-medium text-cyan-950 rtl:leading-snug">
							{value.children.map((child: any) => child.text).join('')}
						</p>
					)
				}
				return (
					<p className="text-cyan-950/80 rtl:leading-snug">
						{value.children.map((child: any) => child.text).join('')}
					</p>
				)
			},
		},
	}

	const icons = [
		<Icon
			icon="ph:phone-line"
			key="PiPhone"
			className="mb-2 text-2xl text-cyan-950/60"
		/>,
		<Icon
			icon="ph:envelope-line"
			key="PiEnvelope"
			className="mb-2 text-2xl text-cyan-950/60"
		/>,
		<Icon
			icon="ph:map-pin-line"
			key="PiMapPin"
			className="mb-2 text-2xl text-cyan-950/60"
		/>,
	]

	return (
		<section className="section py-24">
			<div className={'mb-10 flex max-w-2xl flex-col items-start gap-6'}>
				<PortableText value={content} components={components} />
			</div>
			<div className="fluid-gap grid grid-cols-1 justify-around md:grid-cols-2">
				<NextIntlClientProvider messages={messages}>
					<ContactForm />
				</NextIntlClientProvider>
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					{contactInfo?.map(
						(info: { title: any; link: Sanity.Link }, index: any) => (
							<div key={index} className={`flex w-full flex-col gap-1`}>
								{icons[index]}
								<PortableText value={info.title} components={components} />
								<span className="text-main group flex items-center text-teal-600">
									<Link
										locale={locale}
										href={
											info.link.type === 'internal'
												? processUrl(info.link.internal as any, {
														base: false,
														params: info.link.params,
													})
												: (info.link.external as string)
										}
										className="font-medium text-teal-600 no-underline"
									>
										{info.link.label}
									</Link>
									<Icon
										icon="ph:caret-left-bold"
										className="ms-1 size-3 translate-x-0 text-teal-500/50 transition-transform duration-300 group-hover:-translate-x-1 group-hover:text-teal-600 ltr:rotate-180 ltr:group-hover:translate-x-1"
									/>
								</span>
							</div>
						),
					)}
				</div>
			</div>
		</section>
	)
}
