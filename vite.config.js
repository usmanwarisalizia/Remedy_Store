import { defineConfig } from "vite";
import tailwind from "@tailwindcss/vite";

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [tailwind()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: isSsrBuild
          ? undefined
          : {
              react: ["react", "react-dom"],
              motion: ["motion"],
              swiper: ["swiper"],
            },
      },
    },
  },
}));
