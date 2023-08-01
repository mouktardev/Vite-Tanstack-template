import { LoaderClientProvider } from "@tanstack/react-loaders";
import { createRoot } from "react-dom/client";
import { Routes, loaderClient } from "./routes";
import "./styles/global.css";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById("root")!;
createRoot(container).render(
	<LoaderClientProvider client={loaderClient}>
		<Routes />
	</LoaderClientProvider>
);
