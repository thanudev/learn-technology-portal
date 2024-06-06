"use client";
import useAuth from "@/app/_hooks/useAuth";
import { BookOpenCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function Unit({ unit }) {
  const { userInfo } = useAuth();
  return (
    <Link href={userInfo ? "/unit-detail/" + unit?.id : "/sign-in"}>
      <div className="border rounded-md cursor-pointer hover:shadow-md">
        <img
          src={unit?.banner?.url}
          className="w-[100%] h-[190px] rounded-t-md object-cover"
        />

        <div className="p-1 gap-1">
          <h2 className="font-semibold">{unit?.unitName}</h2>
          <h2>Unit {unit?.unitNumber}</h2>
          <div className="flex gap-1 ">
            <BookOpenCheck />
            <h3>{unit?.chapters?.length} Chapters</h3>
          </div>
          <h2 className="text-gray-400 text-[14px]">{unit?.author}</h2>
        </div>
      </div>
    </Link>
  );
}

export default Unit;
