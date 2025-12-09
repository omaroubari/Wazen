import SiteCallToActionModal, {
	SiteCallToActionProvider,
} from '@/components/SiteCallToActionModal'
import { Toaster } from '@/components/ui/toaster'
import Motion from '@/lib/motionProvider'
import { NextIntlClientProvider } from 'next-intl'

export default function Providers({
	children,
	siteCallToAction,
}: {
	children: React.ReactNode
	siteCallToAction: {
		documents?: Sanity.CallToActionDoc[] | null
		locale?: 'en' | 'ar'
	}
}) {
	return (
		<>
			<NextIntlClientProvider>
				<SiteCallToActionProvider {...siteCallToAction}>
					{/* <IntercomProvider> */}
					<Motion>{children}</Motion>
					{/* </IntercomProvider> */}
					<Toaster />
					<SiteCallToActionModal />
				</SiteCallToActionProvider>
			</NextIntlClientProvider>
		</>
	)
}
