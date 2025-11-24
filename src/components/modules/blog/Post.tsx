import Date from '@/components/Date'
import ReadTime from './ReadTime'
import { PortableText } from '@portabletext/react'
import TableOfContents from '@/components/modules/RichtextModule/TableOfContents'
import AnchoredHeading from '@/components/modules/RichtextModule/AnchoredHeading'
import { Img } from '@/components/Img'
import { Icon } from '@iconify-icon/react'

import { Link } from '@/i18n/routing'

import CallToAction from '@/components/modules/blog/BlogPostCallToAction'
import RelatedPosts from './RelatedPosts'

export default function Post({
	post,
	locale,
}: {
	post: Sanity.BlogPost
	locale: any
}) {
	const {
		categories,
		publishDate,
		readTime,
		title,
		metadata,
		headings,
		body,
		callToAction,
		relatedPosts,
	} = post
	return (
		<article className="section mb-[25vh]">
			<header className="mt-20 md:space-y-12 xl:mt-32">
				<div className="space-y-6 md:space-y-8">
					<div className="flex items-center justify-center gap-2 text-sm font-medium">
						{categories && (
							<div className="w-fit rounded-full bg-teal-100 px-3 py-1 text-center text-teal-600">
								{locale === 'ar'
									? categories[0]?.title.ar
									: categories[0]?.title.en}
							</div>
						)}
						<div className="flex w-fit flex-row items-center gap-1 rounded-full px-3 py-1 text-center text-cyan-950/60">
							<Icon icon="ph:calendar-blank-line" className="size-4" />
							<Date value={publishDate} locale={locale} />
						</div>
						<ReadTime value={readTime} />
					</div>
					<h1 className="h1 mx-auto max-w-5xl text-center text-balance text-cyan-950">
						{title}
					</h1>
				</div>
				<Img
					image={metadata.image}
					//
					className="aspect-[inherit] w-full rounded-2xl"
					priority
				/>
			</header>
			<div className="fluid-gap grid grid-cols-1 py-(--size--3rem) md:grid-cols-3 md:items-start">
				<aside className="w-full md:sticky md:top-[calc(var(--header-height)+1rem)]">
					<TableOfContents headings={headings} />
					<RelatedPosts
						posts={relatedPosts}
						locale={locale}
						className="mt-(--size--3rem) max-lg:hidden"
					/>
				</aside>

				<div className="col-span-1 mx-auto w-full space-y-6 md:col-span-2">
					<PortableText
						value={body}
						components={{
							block: {
								normal: ({ children }) => (
									<p className="text-main text-gray-600">{children}</p>
								),
								h2: (props) => <AnchoredHeading as="h2" {...props} />,
								h3: (props) => <AnchoredHeading as="h3" {...props} />,
							},
							list: {
								bullet: ({ children }) => (
									<ul className="ms-6 list-disc space-y-4 text-gray-800">
										{children}
									</ul>
								),
								number: ({ children }) => (
									<ol className="ms-6 list-decimal space-y-4 text-gray-800">
										{children}
									</ol>
								),
								checkmarks: ({ children }) => (
									<ol className="m-auto text-lg">{children}</ol>
								),
							},
							listItem: {
								bullet: ({ children }) => (
									<li style={{ listStyleType: 'revert' }}>{children}</li>
								),
								number: ({ children }) => (
									<ol className="ms-6 list-decimal space-y-4 text-gray-800">
										{children}
									</ol>
								),
								checkmarks: ({ children }) => <li>✅ {children}</li>,
							},
							types: {
								image: ({ value }) => (
									<Img image={value} className="h-auto w-full rounded-2xl" />
								),
							},
							marks: {
								link: ({ children, value }) => {
									return (
										<Link
											href={value.href}
											className="text-teal-600 underline decoration-teal-500/60 underline-offset-8 transition-all hover:text-teal-500 hover:underline-offset-10"
										>
											{children}
										</Link>
									)
								},
							},
						}}
					/>
					<CallToAction {...callToAction} className="px-0" />
					<RelatedPosts
						posts={relatedPosts}
						locale={locale}
						className="lg:hidden"
					/>
				</div>
			</div>
		</article>
	)
}
