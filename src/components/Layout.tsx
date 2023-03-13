import React from "react"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen w-screen">
      {children}
    </div>
  )
}

export default Layout