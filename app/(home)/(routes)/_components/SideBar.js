"use client";
import React, { useState } from "react";
import { IoFolder } from "react-icons/io5";
import { ImBooks } from "react-icons/im";
import Link from "next/link";

function SideBar({ closeMenu }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const menuList = [
    {
      id: 1,
      name: "Explore",
      icon: IoFolder,
      path: "/explore",
      access: true,
    },
    {
      id: 2,
      name: "Pastpapers",
      icon: ImBooks,
      path: "/pastpapers",
      access: true,
    },
  ];
  return (
    <div className="h-screen bg-white border-r flex-col overflow-y-auto shadow-md">
      {/* App Icon Section */}
      <div className="flex flex-row items-center justify-evenly p-5 border-b">
        <img
          src="/appicon.png"
          alt="appicon"
          height={60}
          width={60}
          className="rounded-full"
        />
        <h2 className="font-medium">Learn Technology</h2>
      </div>

      {/* Menu Section */}
      <div className="flex flex-col">
        {menuList?.map((menu, index) => (
          <Link key={index} href={menu.path}>
            <div
              onClick={() => {
                setActiveIndex(index);
                closeMenu();
              }}
              className={`group flex gap-2 items-center p-4 px-6 cursor-pointer text-gray-600 hover:text-blue-400 hover:bg-gray-50 ${
                activeIndex === index && "bg-blue-50 text-blue-600 font-medium"
              }`}
            >
              <menu.icon size={25} />
              <h2>{menu?.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
