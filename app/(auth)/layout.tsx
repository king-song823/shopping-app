import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return <div className="flex-center min-h-screen w-full">{children}</div>;
};

export default Layout;
