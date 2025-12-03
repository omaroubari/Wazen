import CTA from '@/components/CTA'
import { cn } from '@/lib/utils'
import * as m from 'motion/react-m'

type PromoBannerProps = {
	promoTitle?: string
	promoDescription?: string
	promoCtas?: Sanity.CTA[]
	promoAdditionalText?: string
	promoFeatures?: {
		text?: string
	}[]
}

export default function PromoBanner({
	promoTitle,
	promoDescription,
	promoCtas,
	promoAdditionalText,
	promoFeatures,
}: PromoBannerProps) {
	return (
		<>
			<style
				dangerouslySetInnerHTML={{
					__html: `
					.promo-cta-wrapper a,
					.promo-cta-wrapper a span {
						opacity: 1 !important;
						transform: none !important;
					}
				`,
				}}
			/>
			<div className="section bg-gray-50 py-8 sm:py-12 md:py-16">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<m.div
						className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-700 via-cyan-800 to-teal-900 p-6 shadow-2xl sm:rounded-3xl sm:p-8 md:p-12 lg:p-16"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: false, amount: 0.2 }}
						variants={{
							hidden: { opacity: 0, y: 30 },
							visible: {
								opacity: 1,
								y: 0,
								transition: {
									duration: 0.6,
									ease: 'easeOut',
								},
							},
						}}
					>
						{/* Decorative gradient overlay */}
						<div
							className="absolute inset-0"
							style={{
								background:
									'linear-gradient(to bottom right, #152840, transparent, #152840)',
							}}
						/>

						<div className="relative z-10 grid gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12">
							{/* Right Section - Main Content */}
							<div className="flex flex-col justify-center space-y-4 text-white sm:space-y-5 md:space-y-6">
								{/* Title */}
								{promoTitle && (
									<m.h3
										className="text-xl leading-tight font-semibold sm:text-2xl md:text-3xl lg:text-4xl"
										initial="hidden"
										whileInView="visible"
										viewport={{ once: false, amount: 0.3 }}
										variants={{
											hidden: { opacity: 0, x: -20 },
											visible: {
												opacity: 1,
												x: 0,
												transition: {
													duration: 0.5,
													delay: 0.1,
												},
											},
										}}
									>
										{promoTitle}
									</m.h3>
								)}

								{/* Description */}
								{promoDescription && (
									<m.p
										className="text-sm leading-relaxed text-white/90 sm:text-base md:text-lg"
										initial="hidden"
										whileInView="visible"
										viewport={{ once: false, amount: 0.3 }}
										variants={{
											hidden: { opacity: 0, x: -20 },
											visible: {
												opacity: 1,
												x: 0,
												transition: {
													duration: 0.5,
													delay: 0.2,
												},
											},
										}}
									>
										{promoDescription}
									</m.p>
								)}

								{/* CTA Buttons */}
								{promoCtas && promoCtas.length > 0 && (
									<m.div
										className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
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
													delay: 0.3,
												},
											},
										}}
									>
										{promoCtas.map((cta, index) => (
											<div key={index} className="promo-cta-wrapper">
												<CTA
													link={cta.link}
													style={cta.style}
													className={cn(
														'inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-300 sm:px-6 sm:py-3 sm:text-base',
														index === 0
															? 'bg-teal-500 text-white hover:bg-teal-400 hover:shadow-lg hover:shadow-teal-500/50'
															: 'border-2 border-white/30 bg-transparent text-white backdrop-blur-sm hover:border-white hover:bg-white/10',
													)}
												/>
											</div>
										))}
									</m.div>
								)}

								{/* Additional Text */}
								{promoAdditionalText && (
									<m.p
										className="text-xs leading-relaxed text-white/80 sm:text-sm md:text-base"
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
													delay: 0.4,
												},
											},
										}}
									>
										{promoAdditionalText}
									</m.p>
								)}
							</div>

							{/* Left Section - Features List */}
							{promoFeatures && promoFeatures.length > 0 && (
								<div className="mt-6 flex flex-col justify-center space-y-3 sm:space-y-4 lg:mt-0">
									{promoFeatures.map((feature, index) => (
										<m.div
											key={index}
											className="flex items-start gap-3 text-white"
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
														delay: 0.2 + index * 0.1,
													},
												},
											}}
										>
											{/* Bullet Point */}
											<span
												aria-hidden="true"
												className="mt-2 h-2 w-2 shrink-0 rounded-full bg-teal-400"
											/>
											{/* Feature Text */}
											{feature.text && (
												<p className="text-sm leading-relaxed text-white/90 sm:text-base md:text-lg">
													{feature.text}
												</p>
											)}
										</m.div>
									))}
								</div>
							)}
						</div>
					</m.div>
				</div>
			</div>
		</>
	)
}
