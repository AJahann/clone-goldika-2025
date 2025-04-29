import "../styles/reset.css";
import "../styles/global.css";
import MuiThemeProvider from "@/providers/mui-theme-provider";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html dir="rtl" lang="fa" suppressHydrationWarning>
      <body suppressContentEditableWarning suppressHydrationWarning>
        <MuiThemeProvider>{children}</MuiThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
