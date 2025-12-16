'use client'

import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import Pretitle from '@/components/Pretitle'
import LinkButton from '@/components/LinkButton'
import { cn } from '@/lib/utils'
import * as m from 'motion/react-m'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

type PartnersProgramProps = {
	pretitle?: string
	content?: any
	subcontent?: any
	benefits?: {
		text: string
	}[]
	ctas?: Sanity.CTA[]
	additionalInfo?: any
	// Card Section
	cardTitle?: string
	cardDescription?: any
	cardBenefits?: {
		text: string
	}[]
	// About Program Section
	aboutPretitle?: string
	aboutTitle?: any
	aboutDescription1?: any
	aboutDescription2?: any
	// Feature Cards
	featureCards?: {
		title: string
		description: string
	}[]
	// Benefits Section
	benefitsPretitle?: string
	benefitsTitle?: any
	benefitsDescription?: any
	benefitCards?: {
		title: string
		description: string
	}[]
	// Who Can Join Section
	whoCanJoinPretitle?: string
	whoCanJoinTitle?: any
	whoCanJoinDescription1?: any
	whoCanJoinDescription2?: any
	// How To Start Section
	howToStartPretitle?: string
	howToStartTitle?: any
	howToStartDescription?: any
	steps?: {
		number?: number
		title: string
		description: string
	}[]
	// Application Form Section
	formPretitle?: string
	formTitle?: any
	formDescription?: any
	// FAQ Section
	faqPretitle?: string
	faqTitle?: any
	faqItems?: {
		question: string
		answer: string
	}[]
	locale?: 'en' | 'ar'
}

const getApplicationFormSchema = (locale: 'en' | 'ar' = 'ar') => {
	const messages = {
		ar: {
			fullName: 'الاسم الكامل مطلوب',
			companyName: 'اسم الشركة مطلوب',
			position: 'المنصب مطلوب',
			mobileNumber: 'رقم الجوال مطلوب',
			email: 'البريد الإلكتروني غير صحيح',
			services: 'يرجى وصف الخدمات',
			targetSectors: 'يرجى تحديد القطاعات المستهدفة',
			erpExperience: 'يرجى اختيار الخبرة مع ERP',
		},
		en: {
			fullName: 'Full name is required',
			companyName: 'Company name is required',
			position: 'Position is required',
			mobileNumber: 'Mobile number is required',
			email: 'Invalid email address',
			services: 'Please describe the services',
			targetSectors: 'Please specify target sectors',
			erpExperience: 'Please select ERP experience',
		},
	}

	const msg = messages[locale]

	return z.object({
		fullName: z.string().min(2, msg.fullName),
		companyName: z.string().min(2, msg.companyName),
		position: z.string().min(2, msg.position),
		mobileNumber: z.string().min(10, msg.mobileNumber),
		email: z.string().email(msg.email),
		services: z.string().min(1, msg.services),
		targetSectors: z.string().min(1, msg.targetSectors),
		erpExperience: z.string().min(1, msg.erpExperience),
	})
}

type ApplicationFormData = z.infer<ReturnType<typeof getApplicationFormSchema>>

export default function PartnersProgram({
	pretitle,
	content,
	subcontent,
	benefits,
	ctas,
	additionalInfo,
	cardTitle,
	cardDescription,
	cardBenefits,
	aboutPretitle,
	aboutTitle,
	aboutDescription1,
	aboutDescription2,
	featureCards,
	benefitsPretitle,
	benefitsTitle,
	benefitsDescription,
	benefitCards,
	whoCanJoinPretitle,
	whoCanJoinTitle,
	whoCanJoinDescription1,
	whoCanJoinDescription2,
	howToStartPretitle,
	howToStartTitle,
	howToStartDescription,
	steps,
	formPretitle,
	formTitle,
	formDescription,
	faqPretitle,
	faqTitle,
	faqItems,
	locale,
}: PartnersProgramProps) {
	const components: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				if (value.style === 'h1') {
					return (
						<h1 className="lg:text-large text-lg leading-tight font-semibold text-cyan-950 sm:text-xl md:text-2xl">
							{value.children.map((child: any) => child.text).join('')}
						</h1>
					)
				}
				if (value.style === 'h2') {
					return (
						<h2 className="lg:text-large text-lg leading-tight font-semibold text-cyan-950 sm:text-xl md:text-2xl">
							{value.children.map((child: any) => child.text).join('')}
						</h2>
					)
				}
				return (
					<p className="md:text-main text-sm leading-relaxed text-gray-600 sm:text-base">
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

	const cardDescriptionComponents: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				return (
					<p className="text-main text-gray-600">
						{value.children.map((child: any) => child.text).join('')}
					</p>
				)
			},
		},
	}

	return (
		<section className="section bg-cyan-50/30 px-4 pt-16 pb-8 sm:px-6 sm:pt-24 sm:pb-12 md:px-8 md:pt-32 md:pb-20 lg:px-12 lg:pt-40 lg:pb-28 xl:px-16 xl:pt-44 xl:pb-32">
			<div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-5 sm:gap-6 md:gap-8 lg:flex-row lg:items-start lg:gap-10 xl:gap-12">
				{/* Right Section - Main Content */}
				<div className="flex w-full max-w-2xl flex-1 flex-col items-start gap-3 sm:gap-4 md:gap-5 lg:gap-6">
					{/* Tagline Badge - Enhanced Design */}
					{pretitle && (
						<m.div
							className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-50 to-cyan-50 px-4 py-2 text-xs shadow-sm transition-all duration-300 hover:shadow-md sm:gap-3 sm:px-6 sm:py-3 sm:text-sm"
							initial="hidden"
							whileInView="visible"
							viewport={{ once: false, amount: 0.3 }}
							variants={{
								hidden: { opacity: 0, scale: 0.9 },
								visible: {
									opacity: 1,
									scale: 1,
									transition: { duration: 0.5, ease: 'easeOut' },
								},
							}}
							whileHover={{
								scale: 1.05,
								transition: { duration: 0.3 },
							}}
						>
							{/* Animated dot */}
							<m.span
								className="relative flex size-3 items-center justify-center"
								animate={{
									scale: [1, 1.2, 1],
								}}
								transition={{
									duration: 2,
									repeat: Infinity,
									ease: 'easeInOut',
								}}
							>
								<span className="absolute size-3 rounded-full bg-teal-500" />
								<span className="absolute size-3 animate-ping rounded-full bg-teal-400 opacity-75" />
							</m.span>

							{/* Text */}
							<span className="text-small font-semibold text-teal-700 transition-colors duration-300 group-hover:text-teal-800">
								{pretitle}
							</span>

							{/* Decorative gradient */}
							<div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-100/50 via-transparent to-cyan-100/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
						</m.div>
					)}

					{/* Main Title */}
					{content && (
						<div className="space-y-4">
							<PortableText value={content} components={components} />
						</div>
					)}

					{/* Description */}
					{subcontent && (
						<div className="space-y-4">
							<PortableText value={subcontent} components={components} />
						</div>
					)}

					{/* Benefits List */}
					{benefits && benefits.length > 0 && (
						<ul className="flex flex-col gap-3 sm:gap-4">
							{benefits.map((benefit, index) => (
								<m.li
									key={index}
									className="flex items-start gap-3"
									initial="hidden"
									whileInView="visible"
									viewport={{ once: false, amount: 0.3 }}
									variants={{
										hidden: { opacity: 0, x: 20 },
										visible: {
											opacity: 1,
											x: 0,
											transition: {
												duration: 0.5,
												delay: index * 0.1,
											},
										},
									}}
								>
									<span
										aria-hidden="true"
										className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-teal-500"
									/>
									<span className="text-main text-gray-600">
										{benefit.text}
									</span>
								</m.li>
							))}
						</ul>
					)}

					{/* CTA Buttons */}
					{ctas && (
						<div className="flex w-full flex-col gap-3 sm:gap-4 md:flex-row">
							{ctas.map((cta, index) => (
								<LinkButton
									key={index}
									{...cta}
									locale={locale}
									variant={
										(cta.style as any) === 'outline'
											? 'outline'
											: (cta.style as any) || 'secondary'
									}
									size="lg"
									className="w-full md:w-auto"
								/>
							))}
						</div>
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

				{/* Left Section - Card */}
				<m.div
					className="relative w-full max-w-md flex-shrink-0 rounded-xl bg-white p-4 shadow-sm sm:rounded-2xl sm:p-5 md:p-6 lg:p-8"
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
					{/* Card Title */}
					{cardTitle && (
						<h3 className="md:text-large mb-3 text-base font-semibold text-cyan-950 sm:mb-4 sm:text-lg">
							{cardTitle}
						</h3>
					)}

					{/* Card Description */}
					{cardDescription && (
						<div className="mb-6 space-y-4">
							<PortableText
								value={cardDescription}
								components={cardDescriptionComponents}
							/>
						</div>
					)}

					{/* Card Benefits List */}
					{cardBenefits && cardBenefits.length > 0 && (
						<ul className="flex flex-col gap-4">
							{cardBenefits.map((benefit, index) => (
								<m.li
									key={index}
									className="flex items-start gap-3"
									initial="hidden"
									whileInView="visible"
									viewport={{ once: false, amount: 0.3 }}
									variants={{
										hidden: { opacity: 0, x: 20 },
										visible: {
											opacity: 1,
											x: 0,
											transition: {
												duration: 0.5,
												delay: 0.3 + index * 0.1,
											},
										},
									}}
								>
									<span
										aria-hidden="true"
										className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-teal-500"
									/>
									<span className="text-main text-center text-gray-600">
										{benefit.text}
									</span>
								</m.li>
							))}
						</ul>
					)}
				</m.div>
			</div>

			{/* About Program Section */}
			{(aboutPretitle ||
				aboutTitle ||
				aboutDescription1 ||
				aboutDescription2) && (
				<div className="mx-auto mt-8 flex w-full max-w-7xl flex-col items-center gap-5 px-3 sm:mt-12 sm:gap-6 sm:px-4 md:mt-16 md:gap-8 md:px-6 lg:mt-20 lg:gap-10 lg:px-8 xl:mt-24 xl:gap-12">
					{/* Header */}
					<div className="flex w-full max-w-4xl flex-col items-center gap-3 text-center sm:gap-4 md:gap-6">
						{/* Pretitle Badge - Enhanced Design */}
						{aboutPretitle && (
							<m.div
								id="about"
								className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-50 to-cyan-50 px-4 py-2 text-xs shadow-sm transition-all duration-300 hover:shadow-md sm:gap-3 sm:px-6 sm:py-3 sm:text-sm"
								initial="hidden"
								whileInView="visible"
								viewport={{ once: false, amount: 0.3 }}
								variants={{
									hidden: { opacity: 0, scale: 0.9 },
									visible: {
										opacity: 1,
										scale: 1,
										transition: { duration: 0.5, ease: 'easeOut' },
									},
								}}
								whileHover={{
									scale: 1.05,
									transition: { duration: 0.3 },
								}}
							>
								{/* Animated dot */}
								<m.span
									className="relative flex size-3 items-center justify-center"
									animate={{
										scale: [1, 1.2, 1],
									}}
									transition={{
										duration: 2,
										repeat: Infinity,
										ease: 'easeInOut',
									}}
								>
									<span className="absolute size-3 rounded-full bg-teal-500" />
									<span className="absolute size-3 animate-ping rounded-full bg-teal-400 opacity-75" />
								</m.span>

								{/* Text */}
								<span className="text-small font-semibold text-teal-700 transition-colors duration-300 group-hover:text-teal-800">
									{aboutPretitle}
								</span>

								{/* Decorative gradient */}
								<div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-100/50 via-transparent to-cyan-100/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
							</m.div>
						)}

						{/* Main Title */}
						{aboutTitle && (
							<div className="space-y-4">
								<PortableText value={aboutTitle} components={components} />
							</div>
						)}

						{/* Description Paragraphs */}
						<div className="flex w-full max-w-3xl flex-col gap-4 text-center sm:gap-5 md:gap-6">
							{aboutDescription1 && (
								<div className="space-y-4">
									<PortableText
										value={aboutDescription1}
										components={components}
									/>
								</div>
							)}
							{aboutDescription2 && (
								<div className="space-y-4">
									<PortableText
										value={aboutDescription2}
										components={components}
									/>
								</div>
							)}
						</div>
					</div>

					{/* Feature Cards */}
					{featureCards && featureCards.length > 0 && (
						<div className="grid w-full max-w-6xl grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-7 xl:gap-8">
							{featureCards.map((card, index) => {
								// Array of gradient colors for variety
								const gradients = [
									'from-teal-500/10 via-cyan-500/5 to-transparent',
									'from-cyan-500/10 via-teal-500/5 to-transparent',
									'from-teal-400/10 via-emerald-500/5 to-transparent',
								]
								const iconColors = [
									'bg-teal-100 text-teal-600',
									'bg-cyan-100 text-cyan-600',
									'bg-emerald-100 text-emerald-600',
								]
								const gradient = gradients[index % gradients.length]
								const iconColor = iconColors[index % iconColors.length]

								return (
									<m.div
										key={index}
										className="group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-gray-100/50 bg-gradient-to-br from-white to-gray-50/50 p-6 shadow-sm backdrop-blur-sm transition-all duration-500 hover:border-teal-300/50 hover:shadow-2xl hover:shadow-teal-100/30 sm:p-8"
										initial="hidden"
										whileInView="visible"
										viewport={{ once: false, amount: 0.3 }}
										variants={{
											hidden: { opacity: 0, y: 40, scale: 0.9 },
											visible: {
												opacity: 1,
												y: 0,
												scale: 1,
												transition: {
													duration: 0.7,
													ease: [0.16, 1, 0.3, 1],
													delay: index * 0.15,
												},
											},
										}}
										whileHover={{
											y: -8,
											scale: 1.03,
											transition: { duration: 0.4, ease: 'easeOut' },
										}}
									>
										{/* Animated background gradient */}
										<div
											className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
										/>

										{/* Decorative corner accent */}
										<div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br from-teal-200/20 to-cyan-200/20 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-50" />

										{/* Icon Circle */}
										<m.div
											className={`relative z-10 mb-2 flex size-14 items-center justify-center rounded-2xl ${iconColor} shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl sm:size-16`}
											animate={{
												rotate: [0, 5, -5, 0],
											}}
											transition={{
												duration: 4,
												repeat: Infinity,
												repeatDelay: 2,
												ease: 'easeInOut',
											}}
										>
											<svg
												className="size-7 sm:size-8"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
												/>
											</svg>
										</m.div>

										{/* Card Content */}
										<div className="relative z-10 flex flex-1 flex-col gap-3">
											{/* Card Title */}
											{card.title && (
												<h3 className="text-base leading-tight font-bold text-cyan-950 transition-colors duration-300 group-hover:text-teal-700 sm:text-lg">
													{card.title}
												</h3>
											)}

											{/* Card Description */}
											{card.description && (
												<p className="flex-1 text-sm leading-relaxed text-gray-600 sm:text-base">
													{card.description}
												</p>
											)}
										</div>

										{/* Animated bottom border */}
										<div className="relative z-10 mt-4 h-1 w-0 overflow-hidden rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-500 group-hover:w-full" />

										{/* Shine effect on hover */}
										<div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-all duration-1000 group-hover:translate-x-full group-hover:opacity-100" />
									</m.div>
								)
							})}
						</div>
					)}
				</div>
			)}

			{/* Who Can Join Section */}
			{(whoCanJoinPretitle ||
				whoCanJoinTitle ||
				whoCanJoinDescription1 ||
				whoCanJoinDescription2) && (
				<m.div
					className="mx-auto mt-8 flex w-full max-w-7xl flex-col items-center gap-4 px-3 sm:mt-12 sm:gap-5 sm:px-4 md:mt-16 md:gap-6 md:px-6 lg:mt-20 lg:gap-8 lg:px-8 xl:mt-24"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: false, amount: 0.3 }}
					variants={{
						hidden: { opacity: 0, y: 30 },
						visible: {
							opacity: 1,
							y: 0,
							transition: { duration: 0.6, ease: 'easeOut' },
						},
					}}
				>
					<div className="flex w-full max-w-4xl flex-col items-center gap-5 rounded-xl bg-white p-5 shadow-sm sm:gap-6 sm:rounded-2xl sm:p-6 md:gap-7 md:p-7 lg:gap-8 lg:p-8 xl:p-10">
						{/* Pretitle Badge - Enhanced Design */}
						{whoCanJoinPretitle && (
							<m.div
								className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-50 to-cyan-50 px-4 py-2 text-xs shadow-sm transition-all duration-300 hover:shadow-md sm:gap-3 sm:px-6 sm:py-3 sm:text-sm"
								initial="hidden"
								whileInView="visible"
								viewport={{ once: false, amount: 0.3 }}
								variants={{
									hidden: { opacity: 0, scale: 0.9 },
									visible: {
										opacity: 1,
										scale: 1,
										transition: { duration: 0.5, ease: 'easeOut' },
									},
								}}
								whileHover={{
									scale: 1.05,
									transition: { duration: 0.3 },
								}}
							>
								{/* Animated dot */}
								<m.span
									className="relative flex size-3 items-center justify-center"
									animate={{
										scale: [1, 1.2, 1],
									}}
									transition={{
										duration: 2,
										repeat: Infinity,
										ease: 'easeInOut',
									}}
								>
									<span className="absolute size-3 rounded-full bg-teal-500" />
									<span className="absolute size-3 animate-ping rounded-full bg-teal-400 opacity-75" />
								</m.span>

								{/* Text */}
								<span className="text-small font-semibold text-teal-700 transition-colors duration-300 group-hover:text-teal-800">
									{whoCanJoinPretitle}
								</span>

								{/* Decorative gradient */}
								<div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-100/50 via-transparent to-cyan-100/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
							</m.div>
						)}

						{/* Main Title */}
						{whoCanJoinTitle && (
							<div className="space-y-4">
								<PortableText value={whoCanJoinTitle} components={components} />
							</div>
						)}

						{/* Description Paragraphs */}
						<div className="flex w-full flex-col gap-4 sm:gap-5 md:gap-6">
							{whoCanJoinDescription1 && (
								<m.div
									className="space-y-4"
									initial="hidden"
									whileInView="visible"
									viewport={{ once: false, amount: 0.3 }}
									variants={{
										hidden: { opacity: 0, x: -20 },
										visible: {
											opacity: 1,
											x: 0,
											transition: { duration: 0.5, delay: 0.2 },
										},
									}}
								>
									<PortableText
										value={whoCanJoinDescription1}
										components={components}
									/>
								</m.div>
							)}
							{whoCanJoinDescription2 && (
								<m.div
									className="space-y-4"
									initial="hidden"
									whileInView="visible"
									viewport={{ once: false, amount: 0.3 }}
									variants={{
										hidden: { opacity: 0, x: -20 },
										visible: {
											opacity: 1,
											x: 0,
											transition: { duration: 0.5, delay: 0.4 },
										},
									}}
								>
									<PortableText
										value={whoCanJoinDescription2}
										components={components}
									/>
								</m.div>
							)}
						</div>
					</div>
				</m.div>
			)}

			{/* Benefits Section */}
			{(benefitsPretitle ||
				benefitsTitle ||
				benefitsDescription ||
				benefitCards) && (
				<div className="mx-auto mt-8 flex w-full max-w-7xl flex-col items-center gap-5 px-3 sm:mt-12 sm:gap-6 sm:px-4 md:mt-16 md:gap-8 md:px-6 lg:mt-20 lg:gap-10 lg:px-8 xl:mt-24 xl:gap-12">
					{/* Header */}
					<div className="flex w-full max-w-4xl flex-col items-center gap-3 text-center sm:gap-4 md:gap-6">
						{/* Pretitle Badge - Enhanced Design */}
						{benefitsPretitle && (
							<m.div
								className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-50 to-cyan-50 px-4 py-2 text-xs shadow-sm transition-all duration-300 hover:shadow-md sm:gap-3 sm:px-6 sm:py-3 sm:text-sm"
								initial="hidden"
								whileInView="visible"
								viewport={{ once: false, amount: 0.3 }}
								variants={{
									hidden: { opacity: 0, scale: 0.9 },
									visible: {
										opacity: 1,
										scale: 1,
										transition: { duration: 0.5, ease: 'easeOut' },
									},
								}}
								whileHover={{
									scale: 1.05,
									transition: { duration: 0.3 },
								}}
							>
								{/* Animated dot */}
								<m.span
									className="relative flex size-3 items-center justify-center"
									animate={{
										scale: [1, 1.2, 1],
									}}
									transition={{
										duration: 2,
										repeat: Infinity,
										ease: 'easeInOut',
									}}
								>
									<span className="absolute size-3 rounded-full bg-teal-500" />
									<span className="absolute size-3 animate-ping rounded-full bg-teal-400 opacity-75" />
								</m.span>

								{/* Text */}
								<span className="text-small font-semibold text-teal-700 transition-colors duration-300 group-hover:text-teal-800">
									{benefitsPretitle}
								</span>

								{/* Decorative gradient */}
								<div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-100/50 via-transparent to-cyan-100/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
							</m.div>
						)}

						{/* Main Title */}
						{benefitsTitle && (
							<div className="space-y-4">
								<PortableText value={benefitsTitle} components={components} />
							</div>
						)}

						{/* Description */}
						{benefitsDescription && (
							<div className="flex w-full max-w-3xl flex-col gap-6 text-center">
								<div className="space-y-4">
									<PortableText
										value={benefitsDescription}
										components={components}
									/>
								</div>
							</div>
						)}
					</div>

					{/* Benefit Cards Grid */}
					{benefitCards && benefitCards.length > 0 && (
						<div className="grid w-full max-w-6xl grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-7 xl:gap-8">
							{benefitCards.map((card, index) => {
								// Array of gradient colors for variety
								const gradients = [
									'from-teal-500/10 via-cyan-500/5 to-transparent',
									'from-cyan-500/10 via-teal-500/5 to-transparent',
									'from-teal-400/10 via-emerald-500/5 to-transparent',
									'from-emerald-500/10 via-teal-500/5 to-transparent',
									'from-cyan-400/10 via-teal-500/5 to-transparent',
									'from-teal-500/10 via-emerald-500/5 to-transparent',
								]
								const iconColors = [
									'bg-teal-100 text-teal-600',
									'bg-cyan-100 text-cyan-600',
									'bg-emerald-100 text-emerald-600',
									'bg-teal-100 text-teal-600',
									'bg-cyan-100 text-cyan-600',
									'bg-emerald-100 text-emerald-600',
								]
								const gradient = gradients[index % gradients.length]
								const iconColor = iconColors[index % iconColors.length]

								return (
									<m.div
										key={index}
										className="group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-gray-100/50 bg-gradient-to-br from-white to-gray-50/50 p-6 shadow-sm backdrop-blur-sm transition-all duration-500 hover:border-teal-300/50 hover:shadow-2xl hover:shadow-teal-100/30 sm:p-8"
										initial="hidden"
										whileInView="visible"
										viewport={{ once: false, amount: 0.3 }}
										variants={{
											hidden: { opacity: 0, y: 40, scale: 0.9 },
											visible: {
												opacity: 1,
												y: 0,
												scale: 1,
												transition: {
													duration: 0.7,
													ease: [0.16, 1, 0.3, 1],
													delay: index * 0.08,
												},
											},
										}}
										whileHover={{
											y: -8,
											scale: 1.03,
											transition: { duration: 0.4, ease: 'easeOut' },
										}}
									>
										{/* Animated background gradient */}
										<div
											className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
										/>

										{/* Decorative corner accent */}
										<div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br from-teal-200/20 to-cyan-200/20 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-50" />

										{/* Icon Circle */}
										<m.div
											className={`relative z-10 mb-2 flex size-14 items-center justify-center rounded-2xl ${iconColor} shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl sm:size-16`}
											animate={{
												rotate: [0, 5, -5, 0],
											}}
											transition={{
												duration: 4,
												repeat: Infinity,
												repeatDelay: 2,
												ease: 'easeInOut',
											}}
										>
											<svg
												className="size-7 sm:size-8"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
												/>
											</svg>
										</m.div>

										{/* Card Content */}
										<div className="relative z-10 flex flex-1 flex-col gap-3">
											{/* Card Title */}
											{card.title && (
												<h3 className="text-lg leading-tight font-bold text-cyan-950 transition-colors duration-300 group-hover:text-teal-700 sm:text-xl">
													{card.title}
												</h3>
											)}

											{/* Card Description */}
											{card.description && (
												<p className="flex-1 text-sm leading-relaxed text-gray-600 sm:text-base">
													{card.description}
												</p>
											)}
										</div>

										{/* Animated bottom border */}
										<div className="relative z-10 mt-4 h-1 w-0 overflow-hidden rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-500 group-hover:w-full" />

										{/* Shine effect on hover */}
										<div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-all duration-1000 group-hover:translate-x-full group-hover:opacity-100" />
									</m.div>
								)
							})}
						</div>
					)}
				</div>
			)}

			{/* How To Start Section */}
			{(howToStartPretitle ||
				howToStartTitle ||
				howToStartDescription ||
				steps) && (
				<m.div
					className="mx-auto mt-12 flex w-full max-w-7xl flex-col items-center gap-8 px-4 sm:mt-16 sm:gap-10 sm:px-6 md:mt-20 md:gap-12 md:px-8 lg:mt-24"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: false, amount: 0.3 }}
					variants={{
						hidden: { opacity: 0, y: 30 },
						visible: {
							opacity: 1,
							y: 0,
							transition: { duration: 0.6, ease: 'easeOut' },
						},
					}}
				>
					{/* Header */}
					<div className="flex w-full max-w-4xl flex-col items-center gap-6 text-center">
						{/* Pretitle Badge - Enhanced Design */}
						{howToStartPretitle && (
							<m.div
								className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-50 to-cyan-50 px-4 py-2 text-xs shadow-sm transition-all duration-300 hover:shadow-md sm:gap-3 sm:px-6 sm:py-3 sm:text-sm"
								initial="hidden"
								whileInView="visible"
								viewport={{ once: false, amount: 0.3 }}
								variants={{
									hidden: { opacity: 0, scale: 0.9 },
									visible: {
										opacity: 1,
										scale: 1,
										transition: { duration: 0.5, ease: 'easeOut' },
									},
								}}
								whileHover={{
									scale: 1.05,
									transition: { duration: 0.3 },
								}}
							>
								{/* Animated dot */}
								<m.span
									className="relative flex size-3 items-center justify-center"
									animate={{
										scale: [1, 1.2, 1],
									}}
									transition={{
										duration: 2,
										repeat: Infinity,
										ease: 'easeInOut',
									}}
								>
									<span className="absolute size-3 rounded-full bg-teal-500" />
									<span className="absolute size-3 animate-ping rounded-full bg-teal-400 opacity-75" />
								</m.span>

								{/* Text */}
								<span className="text-small font-semibold text-teal-700 transition-colors duration-300 group-hover:text-teal-800">
									{howToStartPretitle}
								</span>

								{/* Decorative gradient */}
								<div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-100/50 via-transparent to-cyan-100/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
							</m.div>
						)}

						{/* Main Title */}
						{howToStartTitle && (
							<div className="space-y-4">
								<PortableText value={howToStartTitle} components={components} />
							</div>
						)}

						{/* Description */}
						{howToStartDescription && (
							<div className="flex w-full max-w-3xl flex-col gap-6 text-center">
								<div className="space-y-4">
									<PortableText
										value={howToStartDescription}
										components={components}
									/>
								</div>
							</div>
						)}
					</div>

					{/* Steps */}
					{steps && steps.length > 0 && (
						<div className="grid w-full max-w-5xl grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3 md:gap-6 lg:gap-8">
							{steps.map((step, index) => (
								<m.div
									key={index}
									className="group relative flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-lg sm:gap-4 sm:rounded-2xl sm:p-5 md:p-6 lg:p-7"
									initial="hidden"
									whileInView="visible"
									viewport={{ once: false, amount: 0.3 }}
									variants={{
										hidden: { opacity: 0, y: 30, scale: 0.95 },
										visible: {
											opacity: 1,
											y: 0,
											scale: 1,
											transition: {
												duration: 0.6,
												ease: [0.16, 1, 0.3, 1],
												delay: index * 0.15,
											},
										},
									}}
									whileHover={{
										y: -4,
										transition: { duration: 0.3, ease: 'easeOut' },
									}}
								>
									{/* Step Number Circle */}
									<div className="flex items-start gap-3 sm:gap-4">
										<m.div
											className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-100 to-teal-50 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-md sm:size-12"
											animate={{
												scale: [1, 1.2, 1],
											}}
											transition={{
												duration: 2,
												repeat: Infinity,
												ease: 'easeInOut',
											}}
										>
											<span className="relative z-10 text-base font-bold text-teal-700 sm:text-lg">
												{step.number || index + 1}
											</span>
											<span className="absolute inset-0 rounded-full bg-teal-200/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
											<span className="absolute inset-0 animate-ping rounded-full bg-teal-300/40 opacity-75" />
										</m.div>

										{/* Step Content */}
										<div className="flex flex-1 flex-col gap-3">
											{/* Step Title */}
											{step.title && (
												<h3 className="text-xs leading-tight font-semibold text-cyan-950 transition-colors duration-300 group-hover:text-teal-700 lg:text-sm">
													{step.title}
												</h3>
											)}

											{/* Step Description */}
											{step.description && (
												<p className="text-main leading-relaxed text-gray-600">
													{step.description}
												</p>
											)}
										</div>
									</div>

									{/* Decorative line connecting steps (only on desktop) */}
									{index < steps.length - 1 && (
										<div className="absolute top-12 -right-4 hidden h-0.5 w-8 bg-gradient-to-r from-teal-200 to-transparent md:block" />
									)}
								</m.div>
							))}
						</div>
					)}
				</m.div>
			)}

			{/* Application Form Section */}
			{(formPretitle || formTitle || formDescription) && (
				<m.div
					className="mx-auto mt-8 flex w-full max-w-7xl flex-col items-center gap-5 px-3 sm:mt-12 sm:gap-6 sm:px-4 md:mt-16 md:gap-7 md:px-6 lg:mt-20 lg:gap-8 lg:px-8 xl:mt-24"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: false, amount: 0.3 }}
					variants={{
						hidden: { opacity: 0, y: 30 },
						visible: {
							opacity: 1,
							y: 0,
							transition: { duration: 0.6, ease: 'easeOut' },
						},
					}}
				>
					<div className="flex w-full max-w-4xl flex-col items-center gap-5 rounded-xl bg-white p-5 shadow-sm sm:gap-6 sm:rounded-2xl sm:p-6 md:gap-7 md:p-7 lg:gap-8 lg:p-8 xl:p-10">
						{/* Header */}
						<div className="flex w-full flex-col items-center gap-3 text-center sm:gap-4 md:gap-5 lg:gap-6">
							{/* Pretitle Badge - Enhanced Design */}
							{formPretitle && (
								<m.div
									className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-50 to-cyan-50 px-4 py-2 text-xs shadow-sm transition-all duration-300 hover:shadow-md sm:gap-3 sm:px-6 sm:py-3 sm:text-sm"
									initial="hidden"
									whileInView="visible"
									viewport={{ once: false, amount: 0.3 }}
									variants={{
										hidden: { opacity: 0, scale: 0.9 },
										visible: {
											opacity: 1,
											scale: 1,
											transition: { duration: 0.5, ease: 'easeOut' },
										},
									}}
									whileHover={{
										scale: 1.05,
										transition: { duration: 0.3 },
									}}
								>
									{/* Animated dot */}
									<m.span
										className="relative flex size-3 items-center justify-center"
										animate={{
											scale: [1, 1.2, 1],
										}}
										transition={{
											duration: 2,
											repeat: Infinity,
											ease: 'easeInOut',
										}}
									>
										<span className="absolute size-3 rounded-full bg-teal-500" />
										<span className="absolute size-3 animate-ping rounded-full bg-teal-400 opacity-75" />
									</m.span>

									{/* Text */}
									<span className="text-small font-semibold text-teal-700 transition-colors duration-300 group-hover:text-teal-800">
										{formPretitle}
									</span>

									{/* Decorative gradient */}
									<div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-100/50 via-transparent to-cyan-100/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
								</m.div>
							)}

							{/* Main Title */}
							{formTitle && (
								<div className="space-y-4">
									<PortableText value={formTitle} components={components} />
								</div>
							)}

							{/* Description */}
							{formDescription && (
								<div className="flex w-full max-w-3xl flex-col gap-6 text-center">
									<div className="space-y-4">
										<PortableText
											value={formDescription}
											components={components}
										/>
									</div>
								</div>
							)}
						</div>

						{/* Form */}
						<ApplicationForm locale={locale} />
					</div>
				</m.div>
			)}

			{/* FAQ Section */}
			{(faqPretitle || faqTitle || faqItems) && (
				<m.div
					className="mx-auto mt-8 flex w-full max-w-7xl flex-col items-center gap-5 px-3 sm:mt-12 sm:gap-6 sm:px-4 md:mt-16 md:gap-8 md:px-6 lg:mt-20 lg:gap-10 lg:px-8 xl:mt-24"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: false, amount: 0.3 }}
					variants={{
						hidden: { opacity: 0, y: 30 },
						visible: {
							opacity: 1,
							y: 0,
							transition: { duration: 0.6, ease: 'easeOut' },
						},
					}}
				>
					{/* Header */}
					<div className="flex w-full max-w-4xl flex-col items-center gap-4 text-center sm:gap-5 md:gap-6">
						{/* Pretitle Badge - Enhanced Design */}
						{faqPretitle && (
							<m.div
								className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-50 to-cyan-50 px-4 py-2 text-xs shadow-sm transition-all duration-300 hover:shadow-md sm:gap-3 sm:px-6 sm:py-3 sm:text-sm"
								initial="hidden"
								whileInView="visible"
								viewport={{ once: false, amount: 0.3 }}
								variants={{
									hidden: { opacity: 0, scale: 0.9 },
									visible: {
										opacity: 1,
										scale: 1,
										transition: { duration: 0.5, ease: 'easeOut' },
									},
								}}
								whileHover={{
									scale: 1.05,
									transition: { duration: 0.3 },
								}}
							>
								{/* Animated dot */}
								<m.span
									className="relative flex size-3 items-center justify-center"
									animate={{
										scale: [1, 1.2, 1],
									}}
									transition={{
										duration: 2,
										repeat: Infinity,
										ease: 'easeInOut',
									}}
								>
									<span className="absolute size-3 rounded-full bg-teal-500" />
									<span className="absolute size-3 animate-ping rounded-full bg-teal-400 opacity-75" />
								</m.span>

								{/* Text */}
								<span className="text-small font-semibold text-teal-700 transition-colors duration-300 group-hover:text-teal-800">
									{faqPretitle}
								</span>

								{/* Decorative gradient */}
								<div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-100/50 via-transparent to-cyan-100/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
							</m.div>
						)}

						{/* Main Title */}
						{faqTitle && (
							<div className="space-y-4">
								<PortableText value={faqTitle} components={components} />
							</div>
						)}
					</div>

					{/* FAQ Accordion */}
					{faqItems && faqItems.length > 0 && (
						<div className="w-full max-w-4xl space-y-3 sm:space-y-4">
							{faqItems.map(
								(item: { question: string; answer: string }, index: number) => (
									<FAQItem
										key={index}
										question={item.question}
										answer={item.answer}
										index={index}
									/>
								),
							)}
						</div>
					)}
				</m.div>
			)}
		</section>
	)
}

function FAQItem({
	question,
	answer,
	index,
}: {
	question: string
	answer: string
	index: number
}) {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<m.div
			className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-teal-300 hover:shadow-md sm:rounded-xl"
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
						ease: [0.16, 1, 0.3, 1],
						delay: index * 0.05,
					},
				},
			}}
		>
			{/* Question Button */}
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="flex w-full items-center justify-between gap-2.5 p-3.5 text-left transition-colors duration-200 hover:bg-gray-50/50 sm:gap-3 sm:p-4 md:gap-4 md:p-5 lg:p-6 xl:p-8"
			>
				<div className="flex flex-1 items-start gap-2.5 sm:gap-3 md:gap-4">
					{/* Question Icon */}
					<div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-lg bg-teal-100 text-teal-600 transition-colors duration-300 group-hover:bg-teal-200 sm:mt-1 sm:size-7 md:size-8">
						<svg
							className="size-3.5 sm:size-4 md:size-4.5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>

					{/* Question Text */}
					{question && (
						<h3
							dir="rtl"
							className="flex-1 text-start text-sm leading-tight font-semibold text-cyan-950 transition-colors duration-300 group-hover:text-teal-700 sm:text-base lg:text-lg"
						>
							{question}
						</h3>
					)}
				</div>

				{/* Chevron Icon */}
				<m.div
					animate={{ rotate: isOpen ? 180 : 0 }}
					transition={{ duration: 0.3, ease: 'easeInOut' }}
					className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors duration-300 group-hover:bg-teal-100 group-hover:text-teal-600 sm:size-7 md:size-8"
				>
					<svg
						className="size-4 sm:size-4.5 md:size-5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</m.div>
			</button>

			{/* Answer Content */}
			<m.div
				initial={false}
				animate={{
					height: isOpen ? 'auto' : 0,
					opacity: isOpen ? 1 : 0,
				}}
				transition={{
					duration: 0.3,
					ease: 'easeInOut',
				}}
				className="overflow-hidden"
			>
				<div className="border-t border-gray-100 px-3.5 pt-2.5 pb-3.5 sm:px-4 sm:pt-3 sm:pb-4 md:px-5 md:pt-3.5 md:pb-5 lg:px-6 lg:pt-4 lg:pb-6 xl:px-8 xl:pb-8">
					{answer && (
						<p className="text-xs leading-relaxed text-gray-600 sm:text-sm md:text-base">
							{answer}
						</p>
					)}
				</div>
			</m.div>

			{/* Decorative gradient overlay */}
			<div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-teal-50/0 via-transparent to-cyan-50/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
		</m.div>
	)
}

function ApplicationForm({ locale = 'ar' }: { locale?: 'en' | 'ar' }) {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isSubmitted, setIsSubmitted] = useState(false)

	const isRTL = locale === 'ar'
	const formSchema = getApplicationFormSchema(locale)

	const translations = {
		ar: {
			successTitle: 'تم إرسال طلبك بنجاح',
			successMessage: 'سيقوم فريق الشركاء في وازن بالتواصل معكم قريباً',
			fullName: 'الاسم الكامل *',
			fullNamePlaceholder: 'مثال: أحمد محمد',
			companyName: 'اسم الشركة *',
			companyNamePlaceholder: 'اسم الشركة كما في السجل التجاري',
			position: 'المنصب *',
			positionPlaceholder: 'المدير العام، شريك مؤسس، مدير المبيعات...',
			mobileNumber: 'رقم الجوال *',
			mobileNumberPlaceholder: '+9665XXXXXXXX',
			email: 'البريد الإلكتروني *',
			emailPlaceholder: 'name@company.com',
			services: 'الخدمات التي تقدمها الشركة',
			servicesPlaceholder:
				'استشارات أعمال، تطوير أنظمة، تكامل حلول، خدمات محاسبية...',
			targetSectors: 'القطاعات المستهدفه',
			targetSectorsPlaceholder:
				'مثل: اللوجستيات، التوزيع، التجزئة، الحج والعمرة...',
			erpExperience: 'هل لديكم خبرة سابقة مع أنظمة ERP؟ *',
			erpExperiencePlaceholder: 'اختر من القائمة',
			erpOdoo: 'نعم، مع Odoo',
			erpDynamics: 'نعم، مع Microsoft Dynamics',
			erpSap: 'نعم، مع SAP',
			erpOracle: 'نعم، مع Oracle',
			erpOther: 'نعم، أنظمة أخرى',
			erpNone: 'لا توجد خبرة سابقة مع أنظمة ERP',
			submit: 'إرسال الطلب',
			submitting: 'جاري الإرسال...',
		},
		en: {
			successTitle: 'Your application has been submitted successfully',
			successMessage: 'The Wazen partners team will contact you soon',
			fullName: 'Full Name *',
			fullNamePlaceholder: 'Example: John Smith',
			companyName: 'Company Name *',
			companyNamePlaceholder: 'Company name as in commercial register',
			position: 'Position *',
			positionPlaceholder: 'CEO, Co-founder, Sales Manager...',
			mobileNumber: 'Mobile Number *',
			mobileNumberPlaceholder: '+9665XXXXXXXX',
			email: 'Email *',
			emailPlaceholder: 'name@company.com',
			services: 'Services provided by your company',
			servicesPlaceholder:
				'Business consulting, system development, solution integration, accounting services...',
			targetSectors: 'Target Sectors',
			targetSectorsPlaceholder:
				'e.g., Logistics, Distribution, Retail, Hajj & Umrah...',
			erpExperience: 'Do you have previous experience with ERP systems? *',
			erpExperiencePlaceholder: 'Select from list',
			erpOdoo: 'Yes, with Odoo',
			erpDynamics: 'Yes, with Microsoft Dynamics',
			erpSap: 'Yes, with SAP',
			erpOracle: 'Yes, with Oracle',
			erpOther: 'Yes, other systems',
			erpNone: 'No previous experience with ERP systems',
			submit: 'Submit Application',
			submitting: 'Submitting...',
		},
	}

	const t = translations[locale]

	const form = useForm<ApplicationFormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			fullName: '',
			companyName: '',
			position: '',
			mobileNumber: '',
			email: '',
			services: '',
			targetSectors: '',
			erpExperience: '',
		},
	})

	const onSubmit = async (data: ApplicationFormData) => {
		setIsSubmitting(true)
		try {
			// Extract phone number without country code
			let phoneNumber = data.mobileNumber.replace(/\D+/g, '')
			// Remove country code if present
			if (phoneNumber.startsWith('966')) {
				phoneNumber = phoneNumber.substring(3)
			}

			// Build description from services, target sectors, and ERP experience
			const descriptionParts = []

			// Add services
			descriptionParts.push(
				locale === 'ar'
					? `الخدمات: ${data.services || 'غير محدد'}`
					: `Services: ${data.services || 'Not specified'}`,
			)

			// Add target sectors
			descriptionParts.push(
				locale === 'ar'
					? `القطاعات المستهدفة: ${data.targetSectors || 'غير محدد'}`
					: `Target Sectors: ${data.targetSectors || 'Not specified'}`,
			)

			// Add ERP experience
			const erpLabels: Record<string, { ar: string; en: string }> = {
				odoo: { ar: 'Odoo', en: 'Odoo' },
				dynamics: { ar: 'Microsoft Dynamics', en: 'Microsoft Dynamics' },
				sap: { ar: 'SAP', en: 'SAP' },
				oracle: { ar: 'Oracle', en: 'Oracle' },
				other: { ar: 'أنظمة أخرى', en: 'Other systems' },
				none: { ar: 'لا توجد خبرة', en: 'No experience' },
			}
			const erpLabel =
				erpLabels[data.erpExperience]?.[locale] ||
				data.erpExperience ||
				(locale === 'ar' ? 'غير محدد' : 'Not specified')
			descriptionParts.push(
				locale === 'ar'
					? `خبرة نظام : ${erpLabel}`
					: `ERP Experience: ${erpLabel}`,
			)

			const description = descriptionParts.join('\n')

			// Prepare API payload
			const payload = {
				Lead_NmAr: locale === 'ar' || locale === 'en' ? data.fullName : '',
				Lead_Cmp: data.companyName,
				Cmp_No: 801,
				Brn_No: 8101,
				Lead_desc: description,
				dialing_code: '+966',
				Lead_Tel: phoneNumber,
				Lead_Email: data.email,
				stage_id: 1,
				Lead_source: 28,
				Lead_Position: data.position,
			}

			const response = await fetch(
				'https://erp.wazen.sa/api/v1/new-crm/public-leads/store',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
					body: JSON.stringify(payload),
				},
			)

			const responseData = await response.json()

			// Accept 200 OK, 201 Created, or any 2xx status as success
			// response.ok is true for status codes 200-299 (includes 201)
			// Also check responseData.status if API returns status in response body
			if (
				response.ok ||
				response.status === 201 ||
				response.status === 200 ||
				responseData?.status === 200 ||
				responseData?.status === 201
			) {
				setIsSubmitted(true)
				form.reset()
			} else {
				throw new Error(
					responseData?.message ||
						responseData?.error ||
						'Failed to submit application',
				)
			}
		} catch (error: any) {
			console.error('Error submitting form:', error)
			alert(
				locale === 'ar'
					? `حدث خطأ أثناء إرسال الطلب: ${error.message || 'يرجى المحاولة مرة أخرى'}`
					: `An error occurred while submitting the application: ${error.message || 'Please try again'}`,
			)
		} finally {
			setIsSubmitting(false)
		}
	}

	if (isSubmitted) {
		return (
			<m.div
				className="flex w-full flex-col items-center gap-4 rounded-lg bg-teal-50 p-8"
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5 }}
			>
				<div className="flex size-16 items-center justify-center rounded-full bg-teal-500">
					<svg
						className="size-8 text-white"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M5 13l4 4L19 7"
						/>
					</svg>
				</div>
				<h3 className="text-lg font-semibold text-cyan-950">
					{t.successTitle}
				</h3>
				<p className="text-center text-gray-600">{t.successMessage}</p>
			</m.div>
		)
	}

	return (
		<form
			id="form-partner-program"
			onSubmit={form.handleSubmit(onSubmit)}
			className="flex w-full flex-col gap-4 sm:gap-6"
			dir={isRTL ? 'rtl' : 'ltr'}
		>
			{/* Full Name */}
			<div className="flex flex-col gap-2">
				<label htmlFor="fullName" className="text-sm font-medium text-cyan-950">
					{t.fullName}
				</label>
				<Input
					id="fullName"
					type="text"
					placeholder={t.fullNamePlaceholder}
					dir={isRTL ? 'rtl' : 'ltr'}
					{...form.register('fullName')}
					className={cn(
						isRTL && 'text-right',
						form.formState.errors.fullName &&
							'border-red-500 focus-visible:ring-red-500',
					)}
				/>
				{form.formState.errors.fullName && (
					<p className="text-xs text-red-500">
						{form.formState.errors.fullName.message}
					</p>
				)}
			</div>

			{/* Company Name */}
			<div className="flex flex-col gap-1.5 sm:gap-2">
				<label
					htmlFor="companyName"
					className="text-xs font-medium text-cyan-950 sm:text-sm"
				>
					{t.companyName}
				</label>
				<Input
					id="companyName"
					type="text"
					placeholder={t.companyNamePlaceholder}
					dir={isRTL ? 'rtl' : 'ltr'}
					{...form.register('companyName')}
					className={cn(
						isRTL && 'text-right',
						form.formState.errors.companyName &&
							'border-red-500 focus-visible:ring-red-500',
					)}
				/>
				{form.formState.errors.companyName && (
					<p className="text-xs text-red-500">
						{form.formState.errors.companyName.message}
					</p>
				)}
			</div>

			{/* Position */}
			<div className="flex flex-col gap-2">
				<label htmlFor="position" className="text-sm font-medium text-cyan-950">
					{t.position}
				</label>
				<Input
					id="position"
					type="text"
					placeholder={t.positionPlaceholder}
					dir={isRTL ? 'rtl' : 'ltr'}
					{...form.register('position')}
					className={cn(
						isRTL && 'text-right',
						form.formState.errors.position &&
							'border-red-500 focus-visible:ring-red-500',
					)}
				/>
				{form.formState.errors.position && (
					<p className="text-xs text-red-500">
						{form.formState.errors.position.message}
					</p>
				)}
			</div>

			{/* Mobile Number */}
			<div className="flex flex-col gap-1.5 sm:gap-2">
				<label
					htmlFor="mobileNumber"
					className="text-xs font-medium text-cyan-950 sm:text-sm"
				>
					{t.mobileNumber}
				</label>
				<Input
					id="mobileNumber"
					type="tel"
					placeholder={t.mobileNumberPlaceholder}
					dir={isRTL ? 'rtl' : 'ltr'}
					{...form.register('mobileNumber')}
					className={cn(
						isRTL && 'text-right',
						form.formState.errors.mobileNumber &&
							'border-red-500 focus-visible:ring-red-500',
					)}
				/>
				{form.formState.errors.mobileNumber && (
					<p className="text-xs text-red-500">
						{form.formState.errors.mobileNumber.message}
					</p>
				)}
			</div>

			{/* Email */}
			<div className="flex flex-col gap-2">
				<label htmlFor="email" className="text-sm font-medium text-cyan-950">
					{t.email}
				</label>
				<Input
					id="email"
					type="email"
					placeholder={t.emailPlaceholder}
					dir="ltr"
					{...form.register('email')}
					className={cn(
						form.formState.errors.email &&
							'border-red-500 focus-visible:ring-red-500',
					)}
				/>
				{form.formState.errors.email && (
					<p className="text-xs text-red-500">
						{form.formState.errors.email.message}
					</p>
				)}
			</div>

			{/* Services */}
			<div className="flex flex-col gap-2">
				<label htmlFor="services" className="text-sm font-medium text-cyan-950">
					{t.services}
				</label>
				<Textarea
					id="services"
					placeholder={t.servicesPlaceholder}
					rows={4}
					dir={isRTL ? 'rtl' : 'ltr'}
					{...form.register('services')}
					className={cn(
						isRTL && 'text-right',
						form.formState.errors.services &&
							'border-red-500 focus-visible:ring-red-500',
					)}
				/>
				{form.formState.errors.services && (
					<p className="text-xs text-red-500">
						{form.formState.errors.services.message}
					</p>
				)}
			</div>

			{/* Target Sectors */}
			<div className="flex flex-col gap-1.5 sm:gap-2">
				<label
					htmlFor="targetSectors"
					className="text-xs font-medium text-cyan-950 sm:text-sm"
				>
					{t.targetSectors}
				</label>
				<Textarea
					id="targetSectors"
					placeholder={t.targetSectorsPlaceholder}
					rows={4}
					dir={isRTL ? 'rtl' : 'ltr'}
					{...form.register('targetSectors')}
					className={cn(
						isRTL && 'text-right',
						form.formState.errors.targetSectors &&
							'border-red-500 focus-visible:ring-red-500',
					)}
				/>
				{form.formState.errors.targetSectors && (
					<p className="text-xs text-red-500">
						{form.formState.errors.targetSectors.message}
					</p>
				)}
			</div>

			{/* ERP Experience */}
			<div className="flex flex-col gap-1.5 sm:gap-2">
				<label
					htmlFor="erpExperience"
					className="text-xs font-medium text-cyan-950 sm:text-sm"
				>
					{t.erpExperience}
				</label>
				<Select
					value={form.watch('erpExperience')}
					onValueChange={(value) => form.setValue('erpExperience', value)}
					dir={isRTL ? 'rtl' : 'ltr'}
				>
					<SelectTrigger
						id="erpExperience"
						className={cn(
							isRTL ? 'w-full text-right' : 'w-full text-left',
							form.formState.errors.erpExperience &&
								'border-red-500 focus-visible:ring-red-500',
						)}
					>
						<SelectValue placeholder={t.erpExperiencePlaceholder} />
					</SelectTrigger>
					<SelectContent
						className={isRTL ? 'text-right' : 'text-left'}
						dir={isRTL ? 'rtl' : 'ltr'}
					>
						<SelectItem
							value="odoo"
							className={isRTL ? 'text-right' : 'text-left'}
						>
							{t.erpOdoo}
						</SelectItem>
						<SelectItem
							value="dynamics"
							className={isRTL ? 'text-right' : 'text-left'}
						>
							{t.erpDynamics}
						</SelectItem>
						<SelectItem
							value="sap"
							className={isRTL ? 'text-right' : 'text-left'}
						>
							{t.erpSap}
						</SelectItem>
						<SelectItem
							value="oracle"
							className={isRTL ? 'text-right' : 'text-left'}
						>
							{t.erpOracle}
						</SelectItem>
						<SelectItem
							value="other"
							className={isRTL ? 'text-right' : 'text-left'}
						>
							{t.erpOther}
						</SelectItem>
						<SelectItem
							value="none"
							className={isRTL ? 'text-right' : 'text-left'}
						>
							{t.erpNone}
						</SelectItem>
					</SelectContent>
				</Select>
				{form.formState.errors.erpExperience && (
					<p className="text-xs text-red-500">
						{form.formState.errors.erpExperience.message}
					</p>
				)}
			</div>

			{/* Submit Button */}
			<Button
				type="submit"
				variant="primary"
				size="lg"
				disabled={isSubmitting}
				className="mt-2 w-full bg-teal-600 text-sm hover:bg-teal-700 sm:mt-4 sm:text-base"
			>
				{isSubmitting ? t.submitting : t.submit}
			</Button>
		</form>
	)
}
