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
});
