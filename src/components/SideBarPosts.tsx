import { Link } from "@tanstack/router";

export default function SideBarPosts() {
	return (
		<aside className="sticky min-w-[200px] top-0 h-screen z-40 overflow-hidden px-2 pt-[136px] border shadow-custom backdrop-blur-lg bg-gradient-radial-tl">
			<ul className="flex flex-col gap-4">
				<li>
					<Link
						className="block p-2 hover:bg-sky-950/60 cursor-pointer rounded-md"
						activeProps={{ className: "bg-sky-950 font-semibold" }}
						to="/posts"
					>
						<h1>Posts</h1>
					</Link>
				</li>
				<li>
					<Link
						className="ml-4 block p-2 hover:bg-sky-950/60 cursor-pointer rounded-md"
						activeProps={{ className: "bg-sky-950 font-semibold" }}
						to="/posts/$postId"
						params={{ postId: "post-1" }}
					>
						<h1>Post-1</h1>
					</Link>
				</li>
				<li>
					<Link
						className="ml-4 block p-2 hover:bg-sky-950/60 cursor-pointer rounded-md"
						activeProps={{ className: "bg-sky-950 font-semibold" }}
						to="/posts/$postId"
						params={{ postId: "post-2" }}
					>
						<h1>Post-2</h1>
					</Link>
				</li>
			</ul>
		</aside>
	);
}
