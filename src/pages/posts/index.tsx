import { pageVariants } from "@animation/ani";
import { motion } from "framer-motion";
import Balancer from "react-wrap-balancer";

export default function Posts() {
	return (
		<motion.div variants={pageVariants}>
			<h1 className="text-3xl my-10 font-extrabold tracking-tight">
				<Balancer>Welcome to Posts Homepage</Balancer>
			</h1>
		</motion.div>
	);
}
