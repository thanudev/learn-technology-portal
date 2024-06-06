import useAuth from "@/app/_hooks/useAuth";
import { Button } from "@/components/ui/button";
import { AlignJustifyIcon, User } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function Header({ setShowMenu, showMenu }) {
  const { userInfo, logOut } = useAuth();
  const router = useRouter();

  return (
    <div className="md:ml-64 p-6 border-b flex justify-between items-center">
      <div className="flex gap-4 items-center">
        {!showMenu && (
          <AlignJustifyIcon
            className="md:hidden lg:hidden xl:hidden z-40"
            onClick={() => setShowMenu(true)}
          />
        )}
        <h2 className="font-medium">Learn Technology</h2>
      </div>
      {userInfo ? (
        <User onClick={logOut} />
      ) : (
        <Button
          onClick={() => router.push("/sign-in")}
          className="text-white rounded-full"
        >
          Get Started
        </Button>
      )}
    </div>
  );
}

export default Header;
