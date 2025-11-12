// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   root: "./client",
//   build: {
//     outDir: "../dist/client",
//     emptyOutDir: true,
//     rollupOptions: {
//       input: {
//         "game-center": resolve(__dirname, "client/game-center.html"),
//       },
//     },
//   },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // ✅ import path

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: "./client",
  build: {
    outDir: "../dist/client",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        // ✅ use path.resolve instead of resolve
        "game-center": path.resolve(__dirname, "client/game-center.html"),
      },
    },
  },
});
