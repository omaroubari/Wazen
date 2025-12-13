import * as m from 'motion/react-m'

const reports = () => {
	return (
		<m.div
			initial="hidden"
			whileInView="visible"
			variants={{
				visible: {
					transition: {
						staggerChildren: 0.2,
					},
				},
			}}
			className="relative mx-auto flex h-full max-w-md flex-row-reverse items-center gap-2"
		>
			<m.img
				src="/statistic-img-1.svg"
				alt="reports"
				width={255.88}
				height={338.44}
				loading="lazy"
				variants={{
					hidden: { opacity: 0, scale: 0.75, y: -20 },
					visible: {
						opacity: 1,
						scale: 1,
						y: 0,
					},
				}}
				transition={{
					repeat: Infinity,
					repeatType: 'mirror',
					repeatDelay: 1,
				}}
				className="h-auto w-full max-w-[50%] shrink basis-1/2 rounded-lg shadow-lg"
				style={{ rotate: '-6deg' }} // {{ edit_1 }}
			/>
			<m.img
				src="/statistic-img-2.svg"
				alt="reports"
				width={255.88}
				height={338.44}
				loading="lazy"
				variants={{
					hidden: { opacity: 0, scale: 0.75, y: -20 },
					visible: {
						opacity: 1,
						scale: 1,
						y: 0,
					},
				}}
				transition={{
					repeatType: 'mirror',
					repeat: Infinity,
					repeatDelay: 1,
				}}
				className="h-auto w-full max-w-[50%] shrink basis-1/2 rounded-lg shadow-lg"
				style={{ rotate: '6deg' }} // {{ edit_2 }}
			/>
		</m.div>
	)
}

export default reports
