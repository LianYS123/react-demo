import { defineConfig } from "vite";
const path = require("path");
import reactRefresh from "@vitejs/plugin-react-refresh";
// import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      components: path.resolve(__dirname, "./src/components"),
      common: path.resolve(__dirname, "./src/common"),
      commons: path.resolve(__dirname, "./src/commons"),
      config: path.resolve(__dirname, "./src/config"),
      utils: path.resolve(__dirname, "./src/utils"),
      constants: path.resolve(__dirname, "./src/constants"),
      service: path.resolve(__dirname, "./src/service"),
      hooks: path.resolve(__dirname, "./src/hooks"),
      model: path.resolve(__dirname, "./src/model"),
    },
  },
});
