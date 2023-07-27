import { easing, slideInLeft, slideInTop } from "@animation/ani";
import Image from "@components/ui/Image";
import { Link } from "@tanstack/router";
import { motion } from "framer-motion";
import Balancer from "react-wrap-balancer";
import { postsindex } from "../../routes";
export default function Posts() {
	const postsLoader = postsindex.useLoader()();
	return (
		<div className="max-w-[800px] mx-auto">
			<motion.h1
				variants={slideInLeft}
				className="text-3xl my-10 font-extrabold tracking-tight"
			>
				<Balancer>Welcome to Posts Homepage</Balancer>
			</motion.h1>
			<motion.div
				variants={{
					enter: { transition: { staggerChildren: 0.1, ease: easing } },
				}}
				className="flex gap-4"
			>
				{postsLoader.state.data?.map((post) => (
					<motion.div
						variants={slideInTop}
						key={post.id}
						className="overflow-hidden"
					>
						<Link
							to="/posts/$postId"
							params={{
								postId: post.slug,
							}}
							className="block py-2 text-2xl hover:underline underline-offset-8 cursor-pointer"
							activeProps={{ className: "bg-purple-950 font-semibold" }}
						>
							{post.title}
						</Link>
						<Image
							className="w-60 h-40"
							src={post.image.src}
							alt={post.image.alt}
							aspectRatio="square"
						/>
					</motion.div>
				))}
			</motion.div>
		</div>
	);
}
