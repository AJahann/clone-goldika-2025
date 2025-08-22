import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    retries: 1,
    baseUrl: "http://localhost:3001/",
    defaultCommandTimeout: 10000,
    experimentalMemoryManagement: true,
  },
  component: {
    viewportHeight: 760,
    viewportWidth: 1280,
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});
