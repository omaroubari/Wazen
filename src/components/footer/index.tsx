import Navigation from './Navigation'
import Social from './Social'

export default async function Footer({
	locale,
	footerMenu,
	staticLinks,
	contactInfo,
}: {
	locale: 'en' | 'ar'
	footerMenu?: Sanity.Navigation
	staticLinks?: Sanity.Navigation
	contactInfo: any
}) {
	return (
		<section className="bg-cyan-950">
			<div className="section relative flex w-full flex-col justify-between gap-20 overflow-hidden py-12">
				<div className="flex w-full flex-col justify-between gap-10 lg:flex-row">
					<Navigation
						contactInfo={contactInfo.contactInfo}
						locale={locale}
						footerMenu={footerMenu}
					/>
				</div>
				<Social
					locale={locale}
					className="justify-between"
					staticLinks={staticLinks}
				/>
			</div>
		</section>
	)
}
