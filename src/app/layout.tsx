import "../styles/global.css";

import type { Metadata } from "next";

import MuiThemeProvider from "@/providers/mui-theme-provider";
import QueryProvider from "@/providers/query-provider";
import { Toaster } from "react-hot-toast";

import MainLayoutStyle from "./_component/main-layout-style";

export const metadata: Metadata = {
  title: "Goldika 2025 - Gold Trading Platform",
  description:
    "Modern platform for buying/selling gold bullion & coins with inventory management",
};

const Metas = () => {
  return (
    <head>
      <title>Goldika 2025 - Gold Trading Platform</title>
      <meta
        name="description"
        content="Modern platform for buying/selling gold bullion & coins with inventory management"
      />
      <meta name="keywords" content="Gold" />
      <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
    </head>
  );
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html
      dir="rtl"
      lang="fa"
      title="Goldika 2025 - Gold Trading Platform"
      suppressHydrationWarning
    >
      <Metas />
      <body suppressContentEditableWarning suppressHydrationWarning>
        <MuiThemeProvider>
          <QueryProvider>
            <MainLayoutStyle>{children}</MainLayoutStyle>
            <Toaster />
          </QueryProvider>
        </MuiThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
