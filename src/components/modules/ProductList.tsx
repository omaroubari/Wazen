import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import Pretitle from '@/components/Pretitle'
import { Link } from '@/i18n/routing'
import processUrl from '@/lib/processUrl'
import { Icon } from '@iconify-icon/react'
import { Img } from '@/components/Img'

import { AnimatedBackground } from '@/components/animated/animated-background'

export default function ProductList({
	pretitle,
	content,
	textAlign = 'center',
	products,
	alignItems,
}: Partial<{
	pretitle: string
	content: any
	products: [
		{
			productImage: any
			productTitle: string
			productDescription: string
			link: Sanity.Link
		},
	]
	textAlign: React.CSSProperties['textAlign']
	alignItems: React.CSSProperties['alignItems']
}>) {
	const components: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				if (value.style === 'h2') {
					return (
						<h2 className="h2 leading-tight font-semibold text-cyan-950">
							{value.children.map((child: any) => child.text).join('')}
						</h2>
					)
				}
				return (
					<p className="text-main mx-auto max-w-xl text-gray-600 md:max-w-3xl">
						{value.children.map((child: any) => child.text).join('')}
					</p>
				)
			},
		},
	}

	return (
		<section className="fluid-vertical-space bg-white">
			<div className="section fluid-gap flex w-full flex-col items-center py-12">
				<div className="mb-12 flex w-full max-w-4xl flex-col items-center gap-8 text-center">
					<Pretitle className="text-large font-semibold text-gray-400">
						{pretitle}
					</Pretitle>
					<PortableText value={content} components={components} />
				</div>
				{products && (
					<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
						<AnimatedBackground
							className="rounded-3xl bg-cyan-950"
							transition={{
								type: 'spring',
								bounce: 0.2,
								duration: 0.6,
							}}
							enableHover
						>
							{products.map((product, index) => (
								<li
									key={product.productTitle}
									data-id={`product-card-${product.productTitle}`}
									className="group z-5 flex flex-col rounded-3xl p-4 transition-all"
								>
									<Link
										href={processUrl(product.link.internal as Sanity.PageBase, {
											base: false,
											params: product.link.params,
										})}
									>
										<div className="overflow-hidden rounded-2xl bg-cyan-950/20 p-4">
											<Img
												image={product.productImage}
												alt={product.productTitle}
												className="h-auto w-full rounded-lg"
												loading="lazy"
												sizes="(max-width: 768px) 80vw, (max-width: 1024px) 60vw, 20vw"
											/>
										</div>
										<div className="space-y-1 p-4 text-start transition-all duration-600">
											<h3 className="text-main font-semibold text-gray-600 group-hover:text-teal-500">
												{product.productTitle}
												<Icon
													icon="ph:caret-left-bold"
													className="inline-block size-4 translate-x-0 text-teal-500 opacity-0 transition-transform duration-600 group-hover:-translate-x-1 group-hover:opacity-100 ltr:rotate-180 ltr:group-hover:translate-x-1"
												/>
											</h3>
											<p className="text-small text-gray-600 group-hover:text-white">
												{product.productDescription}
											</p>
										</div>
									</Link>
								</li>
							))}
						</AnimatedBackground>
					</ul>
				)}
			</div>
		</section>
	)
}
