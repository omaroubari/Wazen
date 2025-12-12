import { Variants } from 'motion/react'

export const CONTAINER_VARIANTS: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.05,
		},
	},
	exit: {
		transition: { staggerChildren: 0.05, staggerDirection: -1 },
	},
}

export const FADE_DOWN_ANIMATION_VARIANTS: Variants = {
	hidden: { opacity: 0, y: -10 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}
