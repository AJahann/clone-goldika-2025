"use client";

import theme from "@/styles/theme";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { useServerInsertedHTML } from "next/navigation";
import rtlPlugin from "stylis-plugin-rtl";

const MuiThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const cache = createCache({
    key: "muirtl",
    stylisPlugins: [rtlPlugin],
    prepend: true,
  });
  cache.compat = true;

  useServerInsertedHTML(() => (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(" "),
      }}
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(" ")}`}
    />
  ));

  return (
    <AppRouterCacheProvider
      options={{
        enableCssLayer: true,
        prepend: true,
      }}
    >
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </CacheProvider>
    </AppRouterCacheProvider>
  );
};

export default MuiThemeProvider;
