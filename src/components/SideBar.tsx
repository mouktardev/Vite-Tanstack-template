import { Link } from "@tanstack/router";

export default function SideBar() {
	return (
		<aside className="sticky min-w-[160px] top-0 h-screen z-40 overflow-hidden p-2 border shadow-custom backdrop-blur-lg bg-gradient-radial-tl">
			<nav className="flex flex-col gap-4">
				<img className="h-10 w-10 m-2" src="/vite.svg" alt="logo" />
				<Link
					className="block px-4 py-2 hover:bg-sky-950/60 cursor-pointer rounded-md"
					to="/"
					activeProps={{ className: "bg-sky-950 font-semibold" }}
				>
					Home
				</Link>
				<Link
					className="block px-4 py-2 hover:bg-sky-950/60 cursor-pointer rounded-md"
					to="/posts"
					activeProps={{ className: "bg-sky-950 font-semibold" }}
				>
					Posts
				</Link>
			</nav>
		</aside>
	);
}
