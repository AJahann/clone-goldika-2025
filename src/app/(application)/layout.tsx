import LayoutStyleProvider from "./_component/layout-style-provider";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return <LayoutStyleProvider>{children}</LayoutStyleProvider>;
};

export default Layout;
