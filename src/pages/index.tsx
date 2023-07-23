import { containerVariants } from "@animation/ani";
import { Link } from "@tanstack/router";
import { motion } from "framer-motion";
import { Balancer } from "react-wrap-balancer";

export default function Home() {
	return (
		<motion.div
			variants={containerVariants}
			initial="exit"
			animate="enter"
			exit="exit"
			className="container mx-auto max-w-[800px] px-5 pt-20"
		>
			<div className="w-full flex flex-col justify-center items-center gap-4">
				<h1 className="text-3xl my-10 font-extrabold tracking-tight max-w-lg">
					<Balancer>
						Boilerplate Template Vite React with File Based routing Breadcrumps
						and many more
					</Balancer>
				</h1>
				<Link
					className="font-semibold border rounded-full px-4 py-2"
					to="/posts"
				>
					click to go to Posts
				</Link>
			</div>
		</motion.div>
	);
}
