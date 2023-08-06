import { Fade, WidthLeft } from "@animation/ani";
import { Link } from "@tanstack/router";
import { motion } from "framer-motion";
import { Book, ChevronLeft, Home } from "lucide-react";
import { useCallback, useState } from "react";
import Button from "./ui/Button";

export default function SideBar() {
	const [showSidebar, setShowSidebar] = useState(true);
	const toggleSidebar = useCallback(
		() => setShowSidebar((value) => !value),
		[]
	);
	return (
		<motion.aside
			variants={WidthLeft}
			initial="visible"
			animate={showSidebar ? "visible" : "hidden"}
			className="sticky h-[calc(100vh-42px)] top-[42px] z-40 overflow-hidden p-2 border shadow-custom backdrop-blur-lg bg-gradient-radial-tl"
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
					to="/"
					activeProps={{
						className: "bg-purple-300 dark:bg-purple-950 font-semibold",
					}}
					activeOptions={{ exact: true }}
				>
					<Home className="w-5 h-5" />
					<motion.p
						variants={Fade}
						animate={showSidebar ? "visible" : "hidden"}
						className="tracking-wide text-sm"
					>
						Home
					</motion.p>
				</Link>
				<Link
					className="flex items-center gap-4 p-2 hover:bg-purple-300/60 dark:hover:bg-purple-950/60 cursor-pointer rounded-md"
					to="/posts"
					activeProps={{
						className: "bg-purple-300 dark:bg-purple-950 font-semibold",
					}}
					activeOptions={{ exact: true }}
				>
					<Book className="w-5 h-5" />
					<motion.p
						variants={Fade}
						animate={showSidebar ? "visible" : "hidden"}
						className="tracking-wide text-sm"
					>
						Posts
					</motion.p>
				</Link>
			</nav>
		</motion.aside>
	);
}
