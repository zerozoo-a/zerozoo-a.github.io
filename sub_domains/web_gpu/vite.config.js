import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
	base: "/sub_domains/web_gpu/",
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html"),
				src: resolve(__dirname, "src/examples/triangle/index.html"),
			},
		},
	},
});
