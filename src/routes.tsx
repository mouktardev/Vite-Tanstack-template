/* eslint-disable react-refresh/only-export-components */
import Alert from "@components/ui/Alert";
import { PostsFrontmatter, fetchPost } from "@schema/schema";
import {
	Loader,
	LoaderClient,
	createLoaderOptions,
	typedClient,
	useLoaderInstance,
} from "@tanstack/react-loaders";
import {
	ErrorComponent,
	Outlet,
	Route,
	Router,
	RouterContext,
	RouterProvider,
	lazy,
} from "@tanstack/router";
import { AxiosError } from "axios";
import { Fragment } from "react";
import NotFound from "./pages/404";
import App from "./pages/_app";

const postsLoader = new Loader({
	key: "posts",
	fn: PostsFrontmatter,
	refetchOnWindowFocus: false,
});

const postLoader = new Loader({
	key: "post",
	fn: fetchPost,
	onInvalidate: ({ client }) => {
		typedClient(client).invalidateLoader({ key: "posts" });
	},
	refetchOnWindowFocus: false,
});

export const loaderClient = new LoaderClient({
	loaders: [postsLoader, postLoader],
});

const routerContext = new RouterContext<{
	loaderClient: typeof loaderClient;
}>();

const root = routerContext.createRootRoute({
	component: App || Outlet,
});

const index = new Route({
	getParentRoute: () => root,
	path: "/",
	component: lazy(() => import("./pages/index")),
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
		await loaderClient.load({ key: "posts" });
		return () => useLoaderInstance({ key: "posts" });
	},
	// pendingComponent: () => <Loading />,
	component: lazy(() => import("./pages/posts/layout")),
});

export const postsindex = new Route({
	getParentRoute: () => posts,
	loader: async ({ context: { loaderClient } }) => {
		await loaderClient.load({ key: "posts" });
		return () => useLoaderInstance({ key: "posts" });
	},
	// pendingComponent: () => <Loading />,
	path: "/",
	component: lazy(() => import("./pages/posts/index")),
});

export const postsid = new Route({
	getParentRoute: () => posts,
	path: "$postId",
	loader: async ({ context: { loaderClient }, params: { postId } }) => {
		const loaderOptions = createLoaderOptions({
			key: "post",
			variables: postId,
		});
		await loaderClient.load(loaderOptions);
		// Return a curried hook!
		return () => useLoaderInstance(loaderOptions);
	},
	// pendingComponent: () => <Skeleton />,
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

const routeTree = root.addChildren([
	index,
	_404,
	posts.addChildren([postsindex, postsid]),
]);

const router = new Router({
	routeTree,
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
