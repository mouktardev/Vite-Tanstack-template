import { Fade, WidthLeft } from "@animation/ani";
import Button from "@components/ui/Button";
import { useLoaderInstance } from "@tanstack/react-loaders";
import { Link, Outlet } from "@tanstack/router";
import { motion } from "framer-motion";
import { ChevronLeft, LayoutGrid, Newspaper } from "lucide-react";
import { useCallback, useState } from "react";

export default function Layout() {
	const { data: posts } = useLoaderInstance({ key: "posts" });
	const [showSidebar, setShowSidebar] = useState(true);
	const toggleSidebar = useCallback(
		() => setShowSidebar((value) => !value),
		[]
	);
	return (
		<div className="relative flex flex-1 gap-5">
			<motion.aside
				variants={WidthLeft}
				initial="visible"
				animate={showSidebar ? "visible" : "hidden"}
				className="sticky top-[42px] h-[calc(100vh-42px)] z-40 overflow-hidden px-2 pt-[115px] border shadow-custom backdrop-blur-lg bg-gradient-radial-tl"
			>
				<nav className="flex flex-col gap-4">
					<Button
						className="w-10 h-10 ml-auto border px-2"
						onClick={toggleSidebar}
					>
						<motion.div
							initial={{ rotate: 0 }}
							animate={showSidebar ? { rotate: 0 } : { rotate: 180 }}
							transition={{ ease: "linear" }}
						>
							<ChevronLeft className="h-5 w-5 " />
						</motion.div>
					</Button>
					<Link
						className="flex items-center gap-4 p-2 hover:bg-purple-300/60 dark:hover:bg-purple-950/60 cursor-pointer rounded-md"
						activeProps={{
							className: "bg-purple-300 dark:bg-purple-950 font-semibold",
						}}
						to="/posts"
						search={{ undefined }}
						activeOptions={{ exact: true }}
					>
						<LayoutGrid className="w-5 h-5" />
						<motion.p
							variants={Fade}
							animate={showSidebar ? "visible" : "hidden"}
							className="tracking-wide text-sm"
						>
							All
						</motion.p>
					</Link>
					{posts.map((post) => (
						<Link
							key={post.id}
							to="/posts/$postId"
							params={{
								postId: post.slug,
							}}
							className="flex items-center gap-4 p-2 hover:bg-purple-300/60 dark:hover:bg-purple-950/60 cursor-pointer rounded-md"
							activeProps={{
								className: "bg-purple-300 dark:bg-purple-950 font-semibold",
							}}
						>
							<Newspaper className="h-5 w-5" />
							<motion.p
								variants={Fade}
								animate={showSidebar ? "visible" : "hidden"}
								className="tracking-wide text-sm"
							>
								{post.title}
							</motion.p>
						</Link>
					))}
				</nav>
			</motion.aside>
			<Outlet />
		</div>
	);
}
