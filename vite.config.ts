import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), nodePolyfills({ globals: { Buffer: true } })],
	resolve: {
		alias: [
			{
				find: "@",
				replacement: fileURLToPath(new URL("./src", import.meta.url)),
			},
			{
				find: "@components",
				replacement: fileURLToPath(
					new URL("./src/components", import.meta.url)
				),
			},
			{
				find: "@pages",
				replacement: fileURLToPath(new URL("./src/pages", import.meta.url)),
			},
			{
				find: "@util",
				replacement: fileURLToPath(new URL("./src/util", import.meta.url)),
			},
			{
				find: "@hooks",
				replacement: fileURLToPath(new URL("./src/hooks", import.meta.url)),
			},
			{
				find: "@store",
				replacement: fileURLToPath(new URL("./src/store", import.meta.url)),
			},
			{
				find: "@schema",
				replacement: fileURLToPath(new URL("./src/schema", import.meta.url)),
			},
			{
				find: "@animation",
				replacement: fileURLToPath(new URL("./src/animation", import.meta.url)),
			},
		],
	},
	server: {
		port: 1521,
		// host: true,
		// strictPort: true,
	},
});
