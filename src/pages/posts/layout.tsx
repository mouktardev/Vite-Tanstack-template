import { containerVariants } from "@animation/ani";
import { Link, Outlet } from "@tanstack/router";
import { motion } from "framer-motion";
import { posts } from "../../routes";

export default function Layout() {
	const postsLoader = posts.useLoader()();
	return (
		<motion.div
			variants={containerVariants}
			initial="exit"
			animate="enter"
			exit="exit"
			className="relative flex flex-1 gap-5"
		>
			<aside className="sticky min-w-[200px] top-0 h-screen z-40 overflow-hidden px-2 pt-[136px] border shadow-custom backdrop-blur-lg bg-gradient-radial-tl">
				<ul className="flex flex-col gap-4">
					<li>
						<Link
							className="block p-2 hover:bg-purple-950/60 cursor-pointer rounded-md"
							activeProps={{ className: "bg-purple-950 font-semibold" }}
							to="/posts"
						>
							<h1>Posts</h1>
						</Link>
					</li>
					{postsLoader.state.data.map((post) => (
						<li key={post.id}>
							<Link
								to="/posts/$postId"
								params={{
									postId: post.slug,
								}}
								className="ml-4 block px-4 py-2 hover:bg-purple-950/60 cursor-pointer rounded-md"
								activeProps={{ className: "bg-purple-950 font-semibold" }}
							>
								{post.title}
							</Link>
						</li>
					))}
				</ul>
			</aside>
			<div className="container mx-auto px-5 pt-20">
				<Outlet />
			</div>
		</motion.div>
	);
}
