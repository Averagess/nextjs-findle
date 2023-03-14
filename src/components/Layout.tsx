import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex h-screen w-screen flex-col">{children}</div>;
};

export default Layout;
