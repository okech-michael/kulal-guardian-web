import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

const apiProxyTarget = process.env.API_PROXY_TARGET || "http://127.0.0.1:9999";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  server: apiProxyTarget
    ? {
        proxy: {
          '/api': {
            target: apiProxyTarget,
            changeOrigin: true,
            secure: false,
          },
        },
      }
    : undefined,
  plugins: [
    ...tanstackStart({
      server: { entry: "server" },
    }),
    react(),
    tailwindcss(),
  ],
});
