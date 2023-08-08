/* eslint-disable react-refresh/only-export-components */
import Alert from "@components/ui/Alert";
import { PostsFrontmatter, fetchPost } from "@schema/schema";
import {
	Loader,
	LoaderClient,
	createLoaderOptions,
	typedClient,
} from "@tanstack/react-loaders";
import {
	ErrorComponent,
	Outlet,
	Route,
	Router,
	RouterContext,
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
	component: lazyRouteComponent(() => import("./pages/index"), "Home"),
});

const _404 = new Route({
	getParentRoute: () => root,
	path: "*",
	component: NotFound || Fragment,
});

const postsRoute = new Route({
	getParentRoute: () => root,
	path: "posts",
	loader: async ({ context: { loaderClient } }) => {
		await loaderClient.load({ key: "posts" });
	},
	// pendingComponent: () => <Loading />,
	// wrapInSuspense: true,
}).update({
	component: lazyRouteComponent(() => import("./pages/posts/layout"), "Layout"),
});

const postsindex = new Route({
	getParentRoute: () => postsRoute,
	path: "/",
	component: lazyRouteComponent(() => import("./pages/posts/index"), "Posts"),
});

export const postRoute = new Route({
	getParentRoute: () => postsRoute,
	path: "$postId",
	getContext: ({ params: { postId } }) => {
		return {
			loaderOptions: createLoaderOptions({
				key: "post",
				variables: postId,
			}),
		};
	},
	loader: async ({ context: { loaderClient, loaderOptions } }) => {
		await loaderClient.load(loaderOptions);
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
	// pendingComponent: () => <Loading />,
	// wrapInSuspense: true,
}).update({
	component: lazyRouteComponent(
		() => import("./pages/posts/[slug]"),
		"PostPage"
	),
});

const routeTree = root.addChildren([
	index,
	_404,
	postsRoute.addChildren([postsindex, postRoute]),
]);

export const router = new Router({
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
