import webpackPreprocessor from "@cypress/webpack-preprocessor";
import { defineConfig } from "cypress";
import path from "path";

export default defineConfig({
  e2e: {
    retries: 1,
    baseUrl: "http://localhost:3000/",
    defaultCommandTimeout: 10000,
    experimentalMemoryManagement: true,
    setupNodeEvents(on) {
      const webpackOptions = {
        resolve: {
          alias: {
            "@": path.resolve(__dirname, "src"), // or wherever your source files are
          },
          extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        },
      };
      on("file:preprocessor", webpackPreprocessor({ webpackOptions }));
    },
    viewportHeight: 760,
    viewportWidth: 1280,
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});
