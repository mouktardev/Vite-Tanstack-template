import { childVariants } from "@animation/ani";
import { Link, useRouter } from "@tanstack/router";
import { cn } from "@util/util";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";
export default function Breadcrumbs() {
	const breadcrumbs = useRouter()
		.state.matches.filter((d) => d.route.path !== "/")
		.map((match, index, array) => {
			const id = match.id.replace(/undefined/g, "");
			return (
				<motion.li
					key={id}
					variants={childVariants}
					initial="exit"
					animate="enter"
					exit="exit"
				>
					<Link
						className={cn(
							index === array.length - 1
								? "font-semibold text-sky-600"
								: "text-slate-400",
							"flex items-center gap-1 hover:text-sky-600"
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
		<motion.nav
			className="fixed z-50 top-3 left-1/2 px-4 py-1 rounded-full border bg-black/30 shadow-custom backdrop-blur-md bg-gradient-radial-tb"
			aria-label="Breadcrumb"
		>
			<ul className="h-10 flex items-center gap-4">
				<li>
					<Link
						className={cn(
							breadcrumbs.length < 1 ? "text-sky-600" : "text-slate-400",
							"flex items-center gap-1 hover:text-sky-600"
						)}
						to="/"
					>
						<Home className="h-5 w-5" />
						{breadcrumbs.length > 0 && <ChevronRight className="h-4 w-4" />}
					</Link>
				</li>
				<AnimatePresence>{breadcrumbs}</AnimatePresence>
			</ul>
		</motion.nav>
	);
}
