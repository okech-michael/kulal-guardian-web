import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:9999',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [
    ...tanstackStart({
      server: { entry: "server" },
      nitro: true,
    }),
    react(),
    tailwindcss(),
  ],
});
