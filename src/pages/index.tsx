import { Link } from "@tanstack/router";
export default function Home() {
	return (
		<div className="container m-5 pt-10">
			<div className="space-y-4">
				<h1 className="text-4xl font-extrabold leading-tight tracking-tight">
					SPA + Vite + React + TanStack Router + TanStack Loader
				</h1>
				<p> A file based routing with breadcrumps loaders and many more</p>
				<Link
					className="inline-block font-semibold border rounded-full px-4 py-2"
					to="/posts"
				>
					click to go to Posts
				</Link>
			</div>
		</div>
	);
}
