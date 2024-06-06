"use client";
import { LikeContext } from "@/app/_context/LikeContext";
import useAuth from "@/app/_hooks/useAuth";
import { likeUnit } from "@/app/_services";
import { BookOpenCheck, Heart, HeartCrack, UserCheck2 } from "lucide-react";
import React, { useContext, useLayoutEffect, useState } from "react";

function LeftSection({ unit, getLikes, getUpdatedData }) {
  const { userInfo } = useAuth();

  const { likedEmails, setLikedEmails } = useContext(LikeContext);

  const LikeForUnit = async () => {
    likeUnit(userInfo?.email, unit?.id).then((resp) => {
      getLikes();
      getUpdatedData();
    });
  };

  return (
    <div className="border p-2 rounded-md">
      <div className="flex items-center gap-1 my-2 text-primary font-bold">
        <h1>{unit?.unitNumber}</h1>.<h1>{unit?.unitName}</h1>
      </div>
      <h2 className="font-semibold text-[17px]">Description</h2>

      <p className="text-gray-600">{unit?.description?.markdown}</p>

      <div className="flex justify-between items-center mt-2">
        <div className="text-gray-400 flex items-center gap-1 ">
          <UserCheck2 />
          <h4 className="">{unit?.author}</h4>
        </div>
        <div className="text-black flex items-center gap-2">
          <BookOpenCheck />
          <h4 className="text-gray-900">{unit?.chapters?.length} Chapters</h4>
        </div>
      </div>
      <div className="flex items-center gap-1 mt-2">
        <div>
          {likedEmails?.includes(userInfo?.email) ? (
            <HeartCrack className="text-red-500" />
          ) : (
            <Heart className="text-gray-500" onClick={LikeForUnit} />
          )}
        </div>
        <h2>{unit?.likes?.length} Likes</h2>
      </div>
    </div>
  );
}

export default LeftSection;
