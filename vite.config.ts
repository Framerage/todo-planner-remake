import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      assets: "/src/assets",
      api: "/src/api",
      components: "/src/components",
      hooks: "/src/hooks",
      pages: "/src/pages",
      store: "/src/store",
      types: "/src/types",
      utils: "/src/utils",
    },
  },
  base: "/todo-planner-remake",
  server: {
    open: "/todo-planner-remake",
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles.module.scss";',
      },
    },
  },
});
