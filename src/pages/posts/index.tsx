import Image from "@components/ui/Image";
import { Link } from "@tanstack/router";
import { motion } from "framer-motion";
import Balancer from "react-wrap-balancer";
import { postsindex } from "../../routes";

export default function Posts() {
	const postsLoader = postsindex.useLoader()();

	return (
		<div className="container max-w-[800px] px-5 pt-10">
			<h1 className="text-3xl my-10 font-extrabold tracking-tight">
				<Balancer>Welcome to your Posts Homepage</Balancer>
			</h1>
			<div className="flex gap-4">
				{postsLoader.data?.map((post) => (
					<Link
						key={post.id}
						to="/posts/$postId"
						params={{
							postId: post.slug,
						}}
						className="block py-2 hover:underline underline-offset-8 cursor-pointer"
						activeProps={{ className: "bg-purple-950 font-semibold" }}
					>
						<div className="overflow-hidden border rounded-xl">
							<motion.div
								whileHover="hover"
								variants={{ hover: { scale: 1.2 } }}
							>
								<Image
									className="w-40 h-[200px]"
									src={post.image.src}
									alt={post.image.alt}
									aspectRatio="square"
								/>
							</motion.div>
						</div>
						<p className="text-2xl font-semibold">{post.title}</p>
						<span className="text-xs dark:text-gray-400">
							{/* {formatDate(article.attributes.publishedAt)}  */}
						</span>
					</Link>
				))}
			</div>
		</div>
	);
}
