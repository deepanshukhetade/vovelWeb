import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import builtins from "rollup-plugin-node-builtins";

const builtinsPlugin = {
  ...builtins({ crypto: true }),
  name: "rollup-plugin-node-builtins",
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), builtinsPlugin],
});
