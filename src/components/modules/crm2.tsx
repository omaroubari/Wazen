import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import CTAList from '@/components/CTAList'
import Pretitle from '@/components/Pretitle'
import { cn } from '@/lib/utils'
import { Img } from '@/components/Img'
import { Icon } from '@iconify-icon/react'
import * as m from 'motion/react-m'
import { Variants } from 'motion/react'

type Crm2Props = {
	pretitle?: string
	content?: any
	subcontent?: any
	ctaTagline?: string
	ctas?: Sanity.CTA[]
	image?: Sanity.Image
	additionalInfo?: any
	// Second Section
	secondPretitle?: string
	secondContent?: any
	secondSubcontent?: any
	secondThirdContent?: any
	secondImage?: Sanity.Image
	// Third Section
	thirdPretitle?: string
	thirdContent?: any
	thirdSubcontent?: any
	thirdThirdContent?: any
	thirdImage?: Sanity.Image
	// Fourth Section
	fourthPretitle?: string
	fourthContent?: any
	fourthSubcontent?: any
	fourthThirdContent?: any
	fourthImage?: Sanity.Image
	// Fifth Section
	fifthPretitle?: string
	fifthContent?: any
	fifthSubcontent?: any
	fifthThirdContent?: any
	fifthImage?: Sanity.Image
	// Features Section
	featuresPretitle?: string
	featuresContent?: any
	features?: {
		title: string
		description: string
		icon?: Sanity.Image
	}[]
	// Integration Section
	integrationPretitle?: string
	integrationContent?: any
	integrationSubtitle?: string
	integrationModules?: {
		label: string
		icon?: Sanity.Image
	}[]
}

export default function Crm2({
	pretitle,
	content,
	subcontent,
	ctaTagline,
	ctas,
	image,
	additionalInfo,
	secondPretitle,
	secondContent,
	secondSubcontent,
	secondThirdContent,
	secondImage,
	thirdPretitle,
	thirdContent,
	thirdSubcontent,
	thirdThirdContent,
	thirdImage,
	fourthPretitle,
	fourthContent,
	fourthSubcontent,
	fourthThirdContent,
	fourthImage,
	fifthPretitle,
	fifthContent,
	fifthSubcontent,
	fifthThirdContent,
	fifthImage,
	featuresPretitle,
	featuresContent,
	features,
	integrationPretitle,
	integrationContent,
	integrationSubtitle,
	integrationModules,
}: Crm2Props) {
	const components: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				if (value.style === 'h1') {
					return (
						<h1 className="text-large leading-tight font-semibold text-cyan-950">
							{value.children.map((child: any) => child.text).join('')}
						</h1>
					)
				}
				if (value.style === 'h2') {
					return (
						<h2 className="text-large leading-tight font-semibold text-cyan-950">
							{value.children.map((child: any) => child.text).join('')}
						</h2>
					)
				}
				return (
					<p className="text-main text-gray-600">
						{value.children.map((child: any) => child.text).join('')}
					</p>
				)
			},
		},
	}

	const additionalInfoComponents: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				return (
					<p className="text-small text-gray-600">
						{value.children.map((child: any) => child.text).join('')}
					</p>
				)
			},
		},
	}

	const secondThirdContentComponents: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				const textContent = value.children
					.map((child: any) => child.text)
					.join('')
				if (!textContent.trim()) return null

				return <p className="text-main text-gray-600">{textContent}</p>
			},
		},
		list: {
			bullet: ({ children }) => <ul className="space-y-4">{children}</ul>,
		},
		listItem: {
			bullet: ({ children }) => (
				<li className="flex items-center gap-2">
					<span
						aria-hidden="true"
						className="h-2 w-2 flex-shrink-0 rounded-full bg-teal-500"
					/>
					<span className="text-main text-gray-600">{children}</span>
				</li>
			),
		},
	}

	return (
		<section className="section bg-gray-50 pt-32 pb-24">
			<div className="flex w-full flex-col items-center justify-center gap-8 lg:flex-row lg:items-center lg:justify-start lg:gap-12">
				{/* Right Section - Main Content (المحتوى على اليمين) */}
				<div className="flex w-full max-w-2xl flex-1 flex-col items-start gap-6">
					{/* Tagline Badge */}
					{pretitle && (
						<Pretitle className="text-small flex items-center gap-2 rounded-lg bg-teal-100 px-4 py-2 font-medium text-teal-700">
							<span className="size-2 rounded-full bg-teal-500" />
							{pretitle}
						</Pretitle>
					)}

					{/* Main Content */}
					{content && (
						<div className="space-y-4">
							<PortableText value={content} components={components} />
						</div>
					)}

					{/* Sub Content */}
					{subcontent && (
						<div className="space-y-4">
							<PortableText value={subcontent} components={components} />
						</div>
					)}

					{/* CTA Tagline */}
					{ctaTagline && (
						<p
							className="text-small font-semibold"
							style={{ color: '#0b1633', fontSize: '15px' }}
						>
							{ctaTagline}
						</p>
					)}

					{/* CTA Buttons */}
					{ctas && (
						<CTAList
							ctas={ctas}
							className="w-full gap-4 *:h-12 *:rounded-lg *:px-6 *:text-base *:font-medium *:transition-colors md:flex-row"
						/>
					)}

					{/* Additional Info */}
					{additionalInfo && (
						<div className="pt-2">
							<PortableText
								value={additionalInfo}
								components={additionalInfoComponents}
							/>
						</div>
					)}
				</div>
				{/* Left Section - Hero Media Placeholder (الصورة على اليسار) */}
				<m.div
					className="relative w-full flex-shrink-0 lg:max-w-[650px]"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.3 }}
					variants={{
						hidden: { opacity: 0, x: -20 },
						visible: {
							opacity: 1,
							x: 0,
							transition: { duration: 0.5, ease: 'easeOut' },
						},
					}}
				>
					{image?.asset && (
						<m.div
							className="relative aspect-video w-full max-w-[650px] overflow-hidden rounded-2xl"
							whileHover={{ scale: 1.1, transition: { duration: 0.5 } }}
						>
							<div className="absolute inset-0" />
							<Img
								image={image}
								alt={image?.alt || 'CRM Dashboard'}
								className="relative z-5 h-full w-full object-contain p-2"
								draggable={false}
								loading="lazy"
							/>
						</m.div>
					)}
				</m.div>
			</div>

			{/* Second Section */}
			{(secondPretitle ||
				secondContent ||
				secondSubcontent ||
				secondThirdContent ||
				secondImage) && (
				<div className="mt-16 flex w-full flex-col items-center justify-center gap-8 lg:flex-row lg:items-center lg:justify-start lg:gap-12">
					{/* Left Section - Hero Media Placeholder (الصورة على اليسار) */}
					<m.div
						className="relative w-full flex-shrink-0 lg:max-w-[650px]"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: false, amount: 0.3 }}
						variants={{
							hidden: { opacity: 0, x: -20 },
							visible: {
								opacity: 1,
								x: 0,
								transition: { duration: 0.5, ease: 'easeOut' },
							},
						}}
					>
						{secondImage?.asset && (
							<m.div
								className="relative aspect-video w-full max-w-[650px] overflow-hidden rounded-2xl"
								whileHover={{ scale: 1.1, transition: { duration: 0.5 } }}
							>
								<div className="absolute inset-0" />
								<Img
									image={secondImage}
									alt={secondImage?.alt || 'CRM Dashboard'}
									className="relative z-5 h-full w-full object-contain p-2"
									draggable={false}
									loading="lazy"
								/>
							</m.div>
						)}
					</m.div>

					{/* Right Section - Main Content (المحتوى على اليمين) */}
					<m.div
						className="flex w-full max-w-2xl flex-1 flex-col items-start gap-6"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: false, amount: 0.3 }}
						variants={{
							hidden: { opacity: 0, x: 20 },
							visible: {
								opacity: 1,
								x: 0,
								transition: { duration: 0.5, ease: 'easeOut' },
							},
						}}
					>
						{/* Tagline Badge */}
						{secondPretitle && (
							<Pretitle className="text-small flex items-center gap-2 rounded-lg bg-teal-100 px-4 py-2 font-medium text-teal-700">
								<span className="size-2 rounded-full bg-teal-500" />
								{secondPretitle}
							</Pretitle>
						)}

						{/* Main Content */}
						{secondContent && (
							<div className="space-y-4">
								<PortableText value={secondContent} components={components} />
							</div>
						)}

						{/* Sub Content */}
						{secondSubcontent && (
							<div className="space-y-4">
								<PortableText
									value={secondSubcontent}
									components={components}
								/>
							</div>
						)}

						{/* Third Content */}
						{secondThirdContent && (
							<div className="space-y-4">
								<PortableText
									value={secondThirdContent}
									components={secondThirdContentComponents}
								/>
							</div>
						)}
					</m.div>
				</div>
			)}

			{/* Third Section */}
			{(thirdPretitle ||
				thirdContent ||
				thirdSubcontent ||
				thirdThirdContent ||
				thirdImage) && (
				<div className="mt-16 flex w-full flex-col items-center justify-center gap-8 lg:flex-row lg:items-center lg:justify-start lg:gap-12">
					{/* Right Section - Main Content (المحتوى على اليمين) */}
					<m.div
						className="flex w-full max-w-2xl flex-1 flex-col items-start gap-6"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: false, amount: 0.3 }}
						variants={{
							hidden: { opacity: 0, x: 20 },
							visible: {
								opacity: 1,
								x: 0,
								transition: { duration: 0.5, ease: 'easeOut' },
							},
						}}
					>
						{/* Tagline Badge */}
						{thirdPretitle && (
							<Pretitle className="text-small flex items-center gap-2 rounded-lg bg-teal-100 px-4 py-2 font-medium text-teal-700">
								<span className="size-2 rounded-full bg-teal-500" />
								{thirdPretitle}
							</Pretitle>
						)}

						{/* Main Content */}
						{thirdContent && (
							<div className="space-y-4">
								<PortableText value={thirdContent} components={components} />
							</div>
						)}

						{/* Sub Content */}
						{thirdSubcontent && (
							<div className="space-y-4">
								<PortableText value={thirdSubcontent} components={components} />
							</div>
						)}

						{/* Third Content */}
						{thirdThirdContent && (
							<div className="space-y-4">
								<PortableText
									value={thirdThirdContent}
									components={secondThirdContentComponents}
								/>
							</div>
						)}
					</m.div>
					{/* Left Section - Hero Media Placeholder (الصورة على اليسار) */}
					<m.div
						className="relative w-full flex-shrink-0 lg:max-w-[650px]"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: false, amount: 0.3 }}
						variants={{
							hidden: { opacity: 0, x: -20 },
							visible: {
								opacity: 1,
								x: 0,
								transition: { duration: 0.5, ease: 'easeOut' },
							},
						}}
					>
						{thirdImage?.asset && (
							<m.div
								className="relative aspect-video w-full max-w-[650px] overflow-hidden rounded-2xl"
								whileHover={{ scale: 1.1, transition: { duration: 0.5 } }}
							>
								<div className="absolute inset-0" />
								<Img
									image={thirdImage}
									alt={thirdImage?.alt || 'CRM Dashboard'}
									className="relative z-5 h-full w-full object-contain p-2"
									draggable={false}
									loading="lazy"
								/>
							</m.div>
						)}
					</m.div>
				</div>
			)}

			{/* Fourth Section */}
			{(fourthPretitle ||
				fourthContent ||
				fourthSubcontent ||
				fourthThirdContent ||
				fourthImage) && (
				<div className="mt-16 flex w-full flex-col items-center justify-center gap-8 lg:flex-row lg:items-center lg:justify-start lg:gap-12">
					{/* Left Section - Hero Media Placeholder (الصورة على اليسار) */}
					<m.div
						className="relative w-full flex-shrink-0 lg:max-w-[650px]"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: false, amount: 0.3 }}
						variants={{
							hidden: { opacity: 0, x: -20 },
							visible: {
								opacity: 1,
								x: 0,
								transition: { duration: 0.5, ease: 'easeOut' },
							},
						}}
					>
						{fourthImage?.asset && (
							<m.div
								className="relative aspect-video w-full max-w-[650px] overflow-hidden rounded-2xl"
								whileHover={{ scale: 1.1, transition: { duration: 0.5 } }}
							>
								<div className="absolute inset-0" />
								<Img
									image={fourthImage}
									alt={fourthImage?.alt || 'CRM Dashboard'}
									className="relative z-5 h-full w-full object-contain p-2"
									draggable={false}
									loading="lazy"
								/>
							</m.div>
						)}
					</m.div>
					{/* Right Section - Main Content (المحتوى على اليمين) */}
					<m.div
						className="flex w-full max-w-2xl flex-1 flex-col items-start gap-6"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: false, amount: 0.3 }}
						variants={{
							hidden: { opacity: 0, x: 20 },
							visible: {
								opacity: 1,
								x: 0,
								transition: { duration: 0.5, ease: 'easeOut' },
							},
						}}
					>
						{/* Tagline Badge */}
						{fourthPretitle && (
							<Pretitle className="text-small flex items-center gap-2 rounded-lg bg-teal-100 px-4 py-2 font-medium text-teal-700">
								<span className="size-2 rounded-full bg-teal-500" />
								{fourthPretitle}
							</Pretitle>
						)}

						{/* Main Content */}
						{fourthContent && (
							<div className="space-y-4">
								<PortableText value={fourthContent} components={components} />
							</div>
						)}

						{/* Sub Content */}
						{fourthSubcontent && (
							<div className="space-y-4">
								<PortableText
									value={fourthSubcontent}
									components={components}
								/>
							</div>
						)}

						{/* Third Content */}
						{fourthThirdContent && (
							<div className="space-y-4">
								<PortableText
									value={fourthThirdContent}
									components={secondThirdContentComponents}
								/>
							</div>
						)}
					</m.div>
				</div>
			)}

			{/* Fifth Section */}
			{(fifthPretitle ||
				fifthContent ||
				fifthSubcontent ||
				fifthThirdContent ||
				fifthImage) && (
				<div className="mt-16 flex w-full flex-col items-center justify-center gap-8 lg:flex-row lg:items-center lg:justify-start lg:gap-12">
					{/* Right Section - Main Content (المحتوى على اليمين) */}
					<m.div
						className="flex w-full max-w-2xl flex-1 flex-col items-start gap-6"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: false, amount: 0.3 }}
						variants={{
							hidden: { opacity: 0, x: 20 },
							visible: {
								opacity: 1,
								x: 0,
								transition: { duration: 0.5, ease: 'easeOut' },
							},
						}}
					>
						{/* Tagline Badge */}
						{fifthPretitle && (
							<Pretitle className="text-small flex items-center gap-2 rounded-lg bg-teal-100 px-4 py-2 font-medium text-teal-700">
								<span className="size-2 rounded-full bg-teal-500" />
								{fifthPretitle}
							</Pretitle>
						)}

						{/* Main Content */}
						{fifthContent && (
							<div className="space-y-4">
								<PortableText value={fifthContent} components={components} />
							</div>
						)}

						{/* Sub Content */}
						{fifthSubcontent && (
							<div className="space-y-4">
								<PortableText value={fifthSubcontent} components={components} />
							</div>
						)}

						{/* Third Content */}
						{fifthThirdContent && (
							<div className="space-y-4">
								<PortableText
									value={fifthThirdContent}
									components={secondThirdContentComponents}
								/>
							</div>
						)}
					</m.div>
					{/* Left Section - Hero Media Placeholder (الصورة على اليسار) */}
					<m.div
						className="relative w-full flex-shrink-0 lg:max-w-[650px]"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: false, amount: 0.3 }}
						variants={{
							hidden: { opacity: 0, x: -20 },
							visible: {
								opacity: 1,
								x: 0,
								transition: { duration: 0.5, ease: 'easeOut' },
							},
						}}
					>
						{fifthImage?.asset && (
							<m.div
								className="relative aspect-video w-full max-w-[650px] overflow-hidden rounded-2xl"
								whileHover={{ scale: 1.1, transition: { duration: 0.5 } }}
							>
								<div className="absolute inset-0" />
								<Img
									image={fifthImage}
									alt={fifthImage?.alt || 'CRM Dashboard'}
									className="relative z-5 h-full w-full object-contain p-2"
									draggable={false}
									loading="lazy"
								/>
							</m.div>
						)}
					</m.div>
				</div>
			)}

			{/* Features Section */}
			{(featuresPretitle || featuresContent || features) && (
				<div className="mt-16 flex w-full flex-col items-center gap-12">
					{/* Header Section */}
					<div className="flex w-full max-w-4xl flex-col items-center gap-6 text-center">
						{/* Small Title */}
						{featuresPretitle && (
							<p className="text-small font-medium text-teal-600">
								{featuresPretitle}
							</p>
						)}

						{/* Main Content */}
						{featuresContent && (
							<div className="space-y-4">
								<PortableText value={featuresContent} components={components} />
							</div>
						)}
					</div>

					{/* Features Cards */}
					{features && features.length > 0 && (
						<div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
							{features.map((feature, index) => (
								<m.div
									key={index}
									className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-sm"
									initial="hidden"
									whileInView="visible"
									viewport={{ once: false, amount: 0.3 }}
									variants={{
										hidden: { opacity: 0, y: 20 },
										visible: {
											opacity: 1,
											y: 0,
											transition: {
												duration: 0.5,
												ease: 'easeOut',
												delay: index * 0.1,
											},
										},
									}}
								>
									{feature.icon?.asset && (
										<div className="mb-2 flex items-center gap-3">
											<div className="size-12 flex-shrink-0 overflow-hidden rounded-lg">
												<Img
													image={feature.icon}
													alt={feature.icon?.alt || feature.title}
													className="h-full w-full object-cover"
													draggable={false}
													loading="lazy"
												/>
											</div>
											<h5 className="text-large font-semibold text-cyan-950">
												{feature.title}
											</h5>
										</div>
									)}
									{!feature.icon?.asset && (
										<h3 className="text-large font-semibold text-cyan-950">
											{feature.title}
										</h3>
									)}
									<p className="text-main text-gray-600">
										{feature.description}
									</p>
								</m.div>
							))}
						</div>
					)}
				</div>
			)}

			{/* Integration Section */}
			{(integrationPretitle ||
				integrationContent ||
				integrationSubtitle ||
				integrationModules) && (
				<div className="mt-16 flex w-full flex-col items-center gap-8 bg-cyan-50/50 py-16">
					<div className="flex w-full max-w-4xl flex-col items-center gap-6 text-center">
						{/* Small Title */}
						{integrationPretitle && (
							<p className="text-small font-medium text-teal-600">
								{integrationPretitle}
							</p>
						)}

						{/* Main Content */}
						{integrationContent && (
							<div className="space-y-4">
								<PortableText
									value={integrationContent}
									components={components}
								/>
							</div>
						)}

						{/* Subtitle */}
						{integrationSubtitle && (
							<p className="text-main text-gray-600">{integrationSubtitle}</p>
						)}

						{/* Modules Tags */}
						{integrationModules && integrationModules.length > 0 && (
							<div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
								{integrationModules.map((module, index) => (
									<div key={index} className="flex flex-col gap-3">
										<m.div
											className="group relative flex aspect-square h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-gray-200/60 bg-gradient-to-br from-white to-gray-50/50 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-teal-300/60 hover:shadow-xl hover:shadow-teal-100/50"
											initial="hidden"
											whileInView="visible"
											viewport={{ once: false, amount: 0.3 }}
											whileHover={{
												scale: 1.08,
												y: -8,
												transition: { duration: 0.3, ease: 'easeOut' },
											}}
											variants={{
												hidden: { opacity: 0, y: 30, scale: 0.9 },
												visible: {
													opacity: 1,
													y: 0,
													scale: 1,
													transition: {
														duration: 0.6,
														ease: [0.16, 1, 0.3, 1],
														delay: index * 0.08,
													},
												},
											}}
										>
											{/* Decorative gradient overlay on hover */}
											<div className="absolute inset-0 bg-gradient-to-br from-teal-50/0 via-transparent to-cyan-50/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

											{/* Image Container - يأخذ الحجم الكامل */}
											{module.icon && (
												<m.div
													className="relative z-10 flex h-full w-full items-center justify-center overflow-hidden transition-all duration-300"
													whileHover={{ scale: 1.1, rotate: 2 }}
												>
													<Img
														image={module.icon}
														alt={module.label || 'Module image'}
														className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
													/>
												</m.div>
											)}

											{/* Subtle shine effect */}
											<div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-full group-hover:opacity-100" />
										</m.div>

										{/* Text with enhanced typography - خارج الـ div الأساسي */}
										{module.label && (
											<div className="w-full text-center">
												<h3 className="text-sm leading-tight font-semibold text-gray-700 transition-colors duration-300 md:text-base">
													{module.label}
												</h3>
											</div>
										)}
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			)}
		</section>
	)
}
