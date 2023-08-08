import { LoaderClientProvider } from "@tanstack/react-loaders";
import { RouterProvider } from "@tanstack/router";
import ReactDOM from "react-dom/client";
import { loaderClient, router } from "./routes";
import "./styles/global.css";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<LoaderClientProvider client={loaderClient}>
			<RouterProvider router={router} />
		</LoaderClientProvider>
	);
}
