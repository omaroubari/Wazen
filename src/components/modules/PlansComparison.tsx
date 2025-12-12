'use client'

import React, { useState } from 'react'
import { PortableText } from '@portabletext/react'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { Icon } from '@iconify-icon/react'
import { defaultComponents } from '@/components/portable-text'
import SaudiRiyal from '../saudi-riyal'

const PlansComparison = ({
	content,
	details,
	locale,
}: Partial<{
	content: any
	details: any
	locale: 'en' | 'ar'
}>) => {
	const switchLabel =
		locale === 'en' ? 'Yearly (two months free)' : 'سنوي (شهرين مجاناً)'
	const SR = <SaudiRiyal className="text-gray-950" />
	const monthly = locale === 'en' ? 'monthly' : 'شهرياً'
	const yearly = locale === 'en' ? 'Yearly' : 'سنوياً'

	const [isYearly, setIsYearly] = useState(true)

	return (
		<div className="section py-24">
			<div className="fluid-gap flex w-full flex-col items-center">
				<PortableText value={content} components={defaultComponents} />

				<div className="w-full">
					{/* <!-- table header (prices) --> */}

					<div className="sticky top-(--header-height) z-2 flex w-full flex-row items-end justify-between bg-white *:w-full max-lg:hidden max-lg:w-fit *:max-lg:w-48">
						<div className="flex flex-col items-start justify-end px-2 py-4">
							<div className="flex h-10 w-full flex-row items-center justify-end gap-4 text-sm font-medium text-gray-400 rtl:flex-row-reverse">
								{switchLabel}
								<Switch checked={isYearly} onCheckedChange={setIsYearly} />
							</div>
						</div>
						{details[0].specs.rows.map(
							(row: { cells: string[] }, index: string) => {
								return (
									<div
										className="relative flex flex-col gap-4 px-2 py-4"
										key={row.cells[2]}
									>
										<div className="flex flex-col items-start justify-between">
											<h3 className="text-sm font-medium text-gray-600">
												{row.cells[2]}
											</h3>
											{/* <p className="text-base text-gray-600">description</p> */}
										</div>
										<p className="h5 inline-flex flex-row items-center gap-1 pt-1 font-semibold tracking-normal text-gray-950 ltr:items-center">
											{isYearly ? row.cells[0] : row.cells[1]}
											{!isNaN(parseInt(row.cells[0])) && (
												<>
													{SR}
													<span className="text-large font-medium text-gray-400">
														/{isYearly ? yearly : monthly}
													</span>
												</>
											)}
										</p>
										{/* <button
											className={cn(
												'h-12 w-full text-base',
												index == '1'
													? 'secondary'
													: 'tertiary border border-gray-200 text-gray-950',
											)}
										>
											إبدأ تجربتك المجانية
										</button> */}
									</div>
								)
							},
						)}
					</div>
					{/* table details */}
					<div className="relative mt-6 flex w-full flex-col gap-9 overflow-x-clip text-sm">
						{details?.slice(1).map((detail: any, index: any) => (
							<div key={'details_' + index} id={'details_' + index}>
								{/* table section header */}
								<h3
									className="text-main sticky top-[calc(var(--header-height)+106.31px)] z-1 flex w-full flex-col justify-end rounded-2xl bg-teal-100 p-(--text-main--font-size) py-3 font-semibold text-cyan-900 max-lg:top-(--header-height)"
									aria-hidden="true"
								>
									{detail.title}
								</h3>
								<div className="relative w-full max-lg:overflow-x-scroll">
									{/* table section details */}
									<div className="w-full text-gray-600 lg:w-full">
										<div className="flex flex-row-reverse justify-end border-b text-start text-sm font-medium text-gray-500 *:w-full lg:hidden rtl:flex-row rtl:items-end">
											<div className="w-full"></div>
											{details[0].specs.rows.map(
												(row: { cells: string[] }, index: string) => {
													return (
														<div
															key={index}
															className="w-full p-2 py-3 lg:px-4"
														>
															{row.cells[2]}
														</div>
													)
												},
											)}
										</div>
										{detail.specs?.rows?.map((row: any, index: any) => (
											<div
												key={'rows_' + index}
												className="flex flex-row-reverse justify-between border-b border-gray-200 text-start"
											>
												{row.cells.map((cell: string, index: any) => {
													const cleanedCell = cell
													switch (cleanedCell) {
														case '-':
															return (
																<div
																	key={'cell_' + index}
																	id={'cell_' + index}
																	className={cn(
																		'flex w-full items-center justify-start p-2 py-3 lg:px-4',
																		index == 1 ? 'bg-teal-50' : '',
																	)}
																>
																	<Icon
																		icon="ph:x"
																		className="size-4 text-gray-400"
																	/>
																</div>
															)
														case '✓':
															return (
																<div
																	key={'cell_' + index}
																	className={cn(
																		'flex w-full items-center justify-start p-2 py-3 text-sm text-teal-500 lg:px-4',
																		index == 1 ? 'bg-teal-50' : '',
																	)}
																>
																	<Icon
																		icon="ph:check-bold"
																		className="size-4"
																	/>
																</div>
															)
														default:
															return (
																<div
																	key={'cell_' + index}
																	className={cn(
																		'flex basis-full items-center justify-start p-2 py-3 lg:px-4',
																		index == 1 ? 'bg-teal-50' : '',
																		index == 3
																			? 'w-full bg-white font-medium'
																			: '',
																	)}
																>
																	{cell}
																</div>
															)
													}
												})}
											</div>
										))}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default PlansComparison
