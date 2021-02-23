import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import legacy from "@vitejs/plugin-legacy";
const LessPluginImportNodeModules = require("less-plugin-import-node-modules");

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          "primary-color": "#903156",
        },
        //为了兼容@import 已“~”为前缀的文件路径
        plugins: [new LessPluginImportNodeModules()],
        javascriptEnabled: true,
      },
    },
  },
  plugins: [
    reactRefresh(),
    legacy({
      //兼容ie11
      targets: ["defaults", "last 2 versions", "not dead"],
    }),
  ],
});
