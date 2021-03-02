import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import legacy from "@vitejs/plugin-legacy";
import _ from "lodash";
import path from "path";
const rootPath = path.join(__dirname);
const tsConfig = require(path.join(rootPath, "tsconfig.json"));

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          // "primary-color": "#903156",
        },
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: [
      //为了兼容@import 已“~”为前缀的文件路径
      { find: /^~/, replacement: "" },
      ...getAlias(),
    ],
  },
  plugins: [
    reactRefresh(),
    legacy({
      //兼容ie11
      targets: ["defaults", "last 2 versions", "not dead"],
    }),
  ],
});

/**
 * 获取别名
 */
function getAlias() {
  let alias: Array<{ find: string; replacement: string }> = [];
  _.each(tsConfig.compilerOptions.paths, (value, key) => {
    alias.push({
      find: _.replace(key, "/*", ""),
      replacement: path.join(rootPath, _.replace(value, "/*", "")),
    });
  });
  return alias;
}
