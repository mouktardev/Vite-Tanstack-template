/* eslint-disable react-refresh/only-export-components */
import Alert from "@components/ui/Alert";
import Loading from "@components/ui/Loading";
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
	lazyRouteComponent,
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
	component: lazyRouteComponent(() => import("./pages/index")),
});

const _404 = new Route({
	getParentRoute: () => root,
	path: "*",
	component: NotFound || Fragment,
});

const posts = new Route({
	getParentRoute: () => root,
	path: "posts",
	loader: async ({ context: { loaderClient } }) => {
		await loaderClient.load({ key: "posts" });
		return () => useLoaderInstance({ key: "posts" });
	},
	component: lazyRouteComponent(() => import("./pages/posts/layout")),
	pendingComponent: () => <Loading />,
	// wrapInSuspense: true,
});

const postsindex = new Route({
	getParentRoute: () => posts,
	path: "/",
	component: lazyRouteComponent(() => import("./pages/posts/index")),
	pendingComponent: () => <Loading />,
	// wrapInSuspense: true,
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
	component: lazyRouteComponent(() => import("./pages/posts/[slug]")),
	pendingComponent: () => <Loading />,
	// wrapInSuspense: true,
});

const routeTree = root.addChildren([
	index,
	_404,
	posts.addChildren([postsindex, postsid]),
]);

const router = new Router({
	routeTree,
	// defaultPreload: "intent",
	onRouteChange: () => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "instant",
		});
	},
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
