import { defineConfig } from "vite";
import tailwind from "@tailwindcss/vite";
export default defineConfig({
  plugins: [tailwind()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          motion: ["motion"],
          swiper: ["swiper"],
        },
      },
    },
  },
});
