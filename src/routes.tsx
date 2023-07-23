/* eslint-disable react-refresh/only-export-components */
import Alert from "@components/ui/Alert";
import Loading from "@components/ui/Loading";
import Skeleton from "@components/ui/Skeleton";
import { PostsFrontmatter, fetchPost } from "@schema/schema";
import { Loader, LoaderClient, useLoader } from "@tanstack/react-loaders";
import {
	ErrorComponent,
	Outlet,
	RootRoute,
	Route,
	Router,
	RouterProvider,
	lazy,
} from "@tanstack/router";
import { AxiosError } from "axios";
import { Fragment } from "react";
import NotFound from "./pages/404";
import App from "./pages/_app";

const postsLoader = new Loader({
	fn: PostsFrontmatter,
	refetchOnWindowFocus: false,
});

const postLoader = new Loader({
	fn: fetchPost,
	onInvalidate: () => {
		postsLoader.invalidate();
	},
	refetchOnWindowFocus: false,
});

export const loaderClient = new LoaderClient({
	getLoaders: () => ({
		posts: postsLoader,
		post: postLoader,
	}),
});

const root = RootRoute.withRouterContext<{
	loaderClient: typeof loaderClient;
}>()({
	component: App || Outlet,
});

const _404 = new Route({
	getParentRoute: () => root,
	path: "*",
	component: NotFound || Fragment,
});

export const posts = new Route({
	getParentRoute: () => root,
	path: "posts",
	loader: async ({ context: { loaderClient } }) => {
		const postsLoader = loaderClient.loaders.posts;
		await postsLoader.load();
		return () =>
			useLoader({
				loader: postsLoader,
			});
	},
	pendingComponent: () => <Loading />,
	component: lazy(() => import("./pages/posts/layout")),
});

const postsindex = new Route({
	getParentRoute: () => posts,
	path: "/",
	component: lazy(() => import("./pages/posts/index")),
});

export const postsid = new Route({
	getParentRoute: () => posts,
	path: "$postId",
	loader: async ({ context: { loaderClient }, params: { postId } }) => {
		const postLoader = loaderClient.loaders.post;
		await postLoader.load({
			variables: postId,
		});
		return () =>
			useLoader({
				loader: postLoader,
				variables: postId,
			});
	},
	pendingComponent: () => <Skeleton />,
	errorComponent: ({ error }) => {
		if (error instanceof AxiosError) {
			return (
				<NotFound>
					<Alert>{error.message}</Alert>
				</NotFound>
			);
		}
		return <ErrorComponent error={error} />;
	},
	component: lazy(() => import("./pages/posts/[slug]")),
});
const index = new Route({
	getParentRoute: () => root,
	path: "/",
	component: lazy(() => import("./pages/index")),
});

const config = root.addChildren([
	posts.addChildren([postsindex, postsid]),
	index,
	_404,
]);

const router = new Router({
	routeTree: config,
	// defaultPreload: "intent",
	context: {
		loaderClient,
	},
	// defaultPendingComponent: () => (
	// 	<div className={`p-2 text-2xl`}>
	// 		<Loading />
	// 	</div>
	// ),
});

export const Routes = () => <RouterProvider router={router} />;

declare module "@tanstack/router" {
	interface Register {
		router: typeof router;
	}
}

declare module "@tanstack/react-loaders" {
	interface Register {
		loaderClient: typeof loaderClient;
	}
}
