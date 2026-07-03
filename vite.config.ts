import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  // Legacy browser support: iOS 12 Safari, older Android/Chrome/Edge.
  // esbuild/SWC will down-level ES2020+ syntax (optional chaining, nullish coalescing,
  // logical assignment, class fields, etc.) so bundles parse & run on Safari 12.
  build: {
    target: ["es2017", "safari12", "chrome80", "edge80", "firefox78"],
    cssTarget: ["safari12", "chrome80", "edge80", "firefox78"],
  },
  esbuild: {
    target: "es2017",
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
