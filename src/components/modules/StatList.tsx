import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from 'next-sanity'

export default function StatList({
	content,
	stats,
}: Partial<{
	content: any
	stats: {
		value: string
		text: string
	}[]
}>) {
	const defaultComponents: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				if (value.style === 'h2') {
					return (
						<h2 className="h2 leading-tight font-semibold text-white">
							{value.children.map((child: any) => child.text).join('')}
						</h2>
					)
				}
				return (
					<p className="text-large text-teal-100">
						{value.children.map((child: any) => child.text).join('')}
					</p>
				)
			},
		},
	}

	return (
		<section className="section relative overflow-clip py-12">
			<div className="bg-grid pointer-events-none absolute right-0 left-0 z-0 h-full w-full opacity-15"></div>
			<div className="fluid-gap flex w-full flex-col items-center rounded-2xl bg-linear-to-tl from-cyan-950 to-cyan-700 p-(--size--6rem)">
				{content && (
					<div className="mx-auto max-w-3xl space-y-6 text-center">
						<PortableText value={content} components={defaultComponents} />
					</div>
				)}

				<div className="flex w-full items-start justify-evenly gap-6 max-md:flex-col">
					{stats?.map((stat, key) => (
						<div className="w-full max-w-[250px]" key={key}>
							<dt className="h3 font-semibold text-white">{stat.value}</dt>
							<dd className="text-large font-normal text-balance text-teal-200">
								{stat.text}
							</dd>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
