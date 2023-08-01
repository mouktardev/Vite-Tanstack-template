import { slideInTop } from "@animation/ani";
import { Link, useMatches } from "@tanstack/router";
import { cn } from "@util/util";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "./ui/Image";

export default function Breadcrumbs() {
	const breadcrumbs = useMatches()
		.filter((d) => d.pathname !== "/")
		.map((match, index, array) => {
			const id = match.id.replace(/undefined/g, "");
			return (
				<motion.li
					key={id}
					initial="exit"
					animate="enter"
					exit="exit"
					variants={slideInTop}
				>
					<Link
						className={cn(
							index === array.length - 1
								? "font-semibold text-purple-400"
								: "text-slate-400",
							"flex items-center gap-1 hover:text-purple-400"
						)}
						to={id}
						search={{}}
						params={{}}
					>
						{match.pathname}
						{index !== array.length - 1 && <ChevronRight className="h-4 w-4" />}
					</Link>
				</motion.li>
			);
		});

	return (
		<nav
			// className="fixed z-50 top-3 px-4 py-1 rounded-md border bg-black/30 shadow-custom backdrop-blur-md bg-gradient-radial-tb"
			className="sticky top-0 z-40 w-full px-4 border bg-black/30 shadow-custom backdrop-blur-md bg-gradient-radial-tb"
			aria-label="Breadcrumb"
		>
			<ul className="flex h-10 items-center gap-4">
				<li>
					<Link
						className={cn(
							breadcrumbs.length < 1 ? "text-purple-400" : "text-slate-400",
							"flex items-center gap-1 hover:text-purple-400"
						)}
						to="/"
						activeOptions={{ exact: true }}
					>
						<Image className="h-10 w-10 p-2" src="/vite.svg" alt="logo" />
						{breadcrumbs.length > 0 && <ChevronRight className="h-4 w-4" />}
					</Link>
				</li>
				<AnimatePresence>{breadcrumbs}</AnimatePresence>
			</ul>
		</nav>
	);
}
