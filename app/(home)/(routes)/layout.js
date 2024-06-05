"use client";
import React, { useState } from "react";
import SideBar from "./_components/SideBar";
import Header from "./_components/Header";

function Layout({ children }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div>
      {/* Side Bar Section */}
      <div className="h-screen w-64 fixed flex-col inset-y-0 z-10 hidden md:flex">
        <SideBar closeMenu={() => setShowMenu(false)} />
      </div>

      {/* Open Side Bar When Screen Size Smaller */}
      {showMenu && (
        <div className="h-full w-64 fixed  flex-col inset-y-0 z-10 md:flex">
          <SideBar closeMenu={() => setShowMenu(false)} />
        </div>
      )}

      {/* Header */}
      <div className="w-screen">
        <Header showMenu={showMenu} setShowMenu={setShowMenu} />
      </div>

      <div className="md:ml-64 p-3">{children}</div>
    </div>
  );
}

export default Layout;
