import { Variants } from "framer-motion";

export const containerVariants: Variants = {
	enter: {
		x: 0,
		opacity: 1,
		transition: {
			when: "beforeChildren",
			staggerChildren: 0.5,
			ease: [0.175, 0.85, 0.42, 0.96],
		},
	},
	exit: { x: -100, opacity: 0, transition: { duration: 2 } },
};

export const childVariants: Variants = {
	enter: {
		y: 0,
		opacity: 1,
		transition: { delay: 0.5 },
	},
	exit: {
		y: -20,
		opacity: 0,
	},
};

export const pageVariants: Variants = {
	enter: {
		opacity: 1,
		x: 0,
		transition: { ease: "easeIn" },
	},
	exit: {
		x: -100,
		opacity: 0,
		transition: { ease: "easeOut" },
	},
};

export const skeletonVariants: Variants = {
	enter: {
		opacity: 1,
		transition: { ease: "easeIn" },
	},
	exit: {
		opacity: 0,
		transition: { ease: "easeOut" },
	},
};
