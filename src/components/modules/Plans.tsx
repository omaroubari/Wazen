// import Pricing from '@/components/Pricing'
import { defaultComponents } from '@/components/portable-text'
import { PortableText } from '@portabletext/react'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import dynamic from 'next/dynamic'
const Pricing = dynamic(() => import('@/components/modules/pricing'))

export default async function Plans({
	content,
	plans,
}: Partial<{
	content: any
	plans: any
}>) {
	const messages = await getMessages()

	return (
		<section className="section py-[20vh]">
			<div className="fluid-gap flex w-full flex-col items-center">
				<div className="flex flex-col justify-center gap-6 text-center">
					<PortableText value={content} components={defaultComponents} />
				</div>
				<NextIntlClientProvider messages={messages}>
					<Pricing plans={plans} />
				</NextIntlClientProvider>
			</div>
		</section>
	)
}
