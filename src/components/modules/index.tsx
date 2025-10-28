import dynamic from 'next/dynamic'
import { createDataAttribute } from 'next-sanity'

// Static imports for commonly used components
import Hero from './Hero'
import HeroTwo from './HeroTwo'
import HeroThree from './HeroThree'
import HeroFour from './HeroFour'
import ProductList from './ProductList'
import HowItWorks from './HowItWorks'
import LogoList from './LogoList'

// Dynamic imports for less commonly used components
const Categories = dynamic(() => import('./blog/CategoriesList'))
const BlogRollup = dynamic(() => import('./blog/Rollup'))
const CreativeModule = dynamic(() => import('./CreativeModule'))
const Partners = dynamic(() => import('./PartnersList'))
const FeaturesGridOne = dynamic(() => import('./FeaturesGridOne'))
const FeaturesGridTwo = dynamic(() => import('./FeaturesGridTwo'))
const BriefGroup = dynamic(() => import('./BriefGroup'))
const HomeBriefGroup = dynamic(() => import('./HomeBriefGroup'))
const Plans = dynamic(() => import('./Plans'))
const PlansComparison = dynamic(() => import('./PlansComparison'))
const PlansCalculator = dynamic(() => import('./PlansCalculator'))
const BenefitsBanner = dynamic(() => import('./BenefitsBanner'))
const CallToActionTwo = dynamic(() => import('./CallToActionTwo'))
const AppStoreRollup = dynamic(() => import('./app-store/Rollup'))
const ApplicationsInfiniteScroll = dynamic(
	() => import('./ApplicationsInfiniteScroll'),
)
const CallToAction = dynamic(() => import('./CallToAction'))
const RichtextModule = dynamic(() => import('./RichtextModule'))
const StatList = dynamic(() => import('./StatList'))
const CustomHTML = dynamic(() => import('./CustomHTML'))
const ContactUs = dynamic(() => import('./ContactUs'))
const FAQList = dynamic(() => import('./FAQList'))
const Brief = dynamic(() => import('./Brief'))
const Benefits = dynamic(() => import('./Benefits'))
const SingleTestimony = dynamic(() => import('./SingleTestimony'))
const TestimonialList = dynamic(() => import('./TestimonialList'))
const TestimonialListTwo = dynamic(() => import('./TestimonialListTwo'))
const JobApplicationTabs = dynamic(() => import('./JobApplicationTabs'))

const MODULE_MAP = {
	hero: Hero,
	'hero.four': HeroFour,
	'hero.three': HeroThree,
	'hero.two': HeroTwo,
	'logo-list': LogoList,
	'how-it-works': HowItWorks,
	'product-list': ProductList,
	'categories-list': Categories,
	'blog-rollup': BlogRollup,
	'creative-module': CreativeModule,
	'custom-html': CustomHTML,
	partners: Partners,
	'richtext-module': RichtextModule,
	'single-testimony': SingleTestimony,
	'call.to.action': CallToAction,
	'stat-list': StatList,
	'features-grid': FeaturesGridOne,
	'features-grid-2': FeaturesGridTwo,
	'contact-us': ContactUs,
	'brief-group': BriefGroup,
	'home-brief-group': HomeBriefGroup,
	'pricing-list': Plans,
	'pricing-comparison': PlansComparison,
	'pricing-calculator': PlansCalculator,
	'benefits-banner': BenefitsBanner,
	'call.to.action.two': CallToActionTwo,
	'app-store-rollup': AppStoreRollup,
	applications: ApplicationsInfiniteScroll,
	'faq-list': FAQList,
	brief: Brief,
	'solutions-benefits': Benefits,
	'testimonial-list': TestimonialList,
	'testimonial-list-two': TestimonialListTwo,
	jobApplicationTabs: JobApplicationTabs,
} as const

export default async function Modules({
	modules,
	locale,
	page,
	slug,
}: {
	modules?: Sanity.Module[]
	locale?: string
	slug?: string
	page?: Sanity.Page
}) {
	if (!modules?.length) return null
	return (
		<>
			{await Promise.all(
				modules.map(async (module) => {
					if (!module) return null

					const Component = MODULE_MAP[module._type as keyof typeof MODULE_MAP]

					if (!Component) return null

					const dataAttr =
						!!page?._id &&
						createDataAttribute({
							id: page._id,
							type: page?._type,
							path: `page[_key == "${module._key}"]`,
						}).toString()

					return (
						<Component
							key={module._key}
							{...module}
							locale={locale}
							slug={slug}
							data-sanity={dataAttr}
						/>
					)
				}),
			)}
		</>
	)
}
