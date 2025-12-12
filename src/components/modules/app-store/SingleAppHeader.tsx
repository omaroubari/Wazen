import { motionComponents } from '@/components/portable-text'
import CTAList from '@/components/CTAList'
import { Img } from '@/components/Img'
import { PortableText } from 'next-sanity'
import Image from 'next/image'

export default async function SingleAppHeader({
	app,
}: {
	app: {
		icon: Sanity.Image
		title: string
		description: any
		ctas: Sanity.CTA[]
	}
}) {
	return (
		<section className="section py-12">
			<div className="flex w-full flex-col items-center justify-center gap-y-6 rounded-2xl p-12 py-24">
				<div className="relative flex flex-col items-start justify-center gap-8 p-6 lg:flex-row">
					<div className="relative min-h-[150px] min-w-[150px] grow overflow-hidden rounded-md">
						{app.icon ? (
							<Img
								image={app.icon}
								className="size-32 rounded-2xl object-cover shadow-md"
							/>
						) : (
							<Image
								src="/app-icon-placeholder.png"
								alt=""
								width={1080}
								height={1080}
								className="size-32 rounded-2xl object-cover shadow-md"
							/>
						)}
					</div>
					<div className="content space-y-6">
						<h1 className="h2 font-semibold text-cyan-950 group-hover:text-cyan-900">
							{app.title}
						</h1>
						<PortableText
							value={app.description}
							components={motionComponents}
						/>
						<CTAList ctas={app.ctas} className="w-full *:h-12 *:text-base" />
					</div>
				</div>
			</div>
		</section>
	)
}
