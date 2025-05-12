import "../styles/global.css";

import MuiThemeProvider from "@/providers/mui-theme-provider";
import QueryProvider from "@/providers/query-provider";

import MainLayoutStyle from "./_component/main-layout-style";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html dir="rtl" lang="fa" suppressHydrationWarning>
      <body suppressContentEditableWarning suppressHydrationWarning>
        <MuiThemeProvider>
          <QueryProvider>
            <MainLayoutStyle>{children}</MainLayoutStyle>
          </QueryProvider>
        </MuiThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
