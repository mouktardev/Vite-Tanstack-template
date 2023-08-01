import { Link, Outlet } from "@tanstack/router";
import { posts } from "../../routes";

export default function Layout() {
	// const router = useRouterState();
	const postsLoader = posts.useLoader()();
	return (
		<div className="relative flex flex-1 gap-5">
			<aside className="sticky min-w-[200px] top-[42px] h-[calc(100vh-42px)] z-40 overflow-hidden px-2 pt-[115px] border shadow-custom backdrop-blur-lg bg-gradient-radial-tl">
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
					{postsLoader.data?.map((post) => (
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
			<Outlet />
		</div>
	);
}
