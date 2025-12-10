import dynamic from 'next/dynamic'
import Brief from './Brief'
import { ReactElement, Suspense } from 'react'

const Sidebar = dynamic(() => import('@/components/animated/side-bar'))
const MobileApp = dynamic(() =>
	import('@/components/animated/iphone-chart').then((mod) => mod.default),
)
const Integrations = dynamic(() =>
	import('@/components/animated/integrations').then((mod) => mod.default),
)
const Reports = dynamic(() => import('@/components/animated/reports'))

const animatedComponents: ReactElement[] = [
	<Sidebar key="Sidebar" />,
	<Reports key="Reports" />,
	<MobileApp key="MobileApp" />,
	<Integrations key="Integrations" />,
]
export default function BriefGroup({
	briefs,
}: Partial<{
	briefs: Sanity.Module[]
}>) {
	//replace images and image components with an array of interactive components
	return (
		<Suspense>
			<div className="bg-white py-(--size--4-5rem)">
				{briefs?.map((brief, index) => (
					<Brief
						{...brief}
						animatedComponent={animatedComponents[index]}
						key={brief._key}
					/>
				))}
			</div>
		</Suspense>
	)
}
