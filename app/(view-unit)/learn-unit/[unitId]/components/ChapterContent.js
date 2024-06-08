"use client";
import { ChapterContentContext } from "@/app/_context/ChapterContentContext";
import useAuth from "@/app/_hooks/useAuth";
import {
  getUserCompletedChapterWithEmailAndUnit,
  updateCompletedChapter,
  updatePoints,
} from "@/app/_services";
import { Button } from "@/components/ui/button";
import { AlignJustify, CheckCheckIcon, CheckCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";

function ChapterContent({
  showNav,
  setShowNav,

  loading,
  enrollment,

  UpdateHandler,
}) {
  const { activeChapter, setActiveChapter } = useContext(ChapterContentContext);
  const { userInfo } = useAuth();

  const checkIsChapterCompleted = (chapterId) => {
    if (enrollment?.completedChapters?.length <= 0) {
      return false;
    }
    const resp = enrollment?.completedChapters?.find(
      (item, index) => item?.chapterId === chapterId
    );
    console.log(resp);
    return resp;
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        {!showNav && (
          <AlignJustify
            className="sm:hidden md:hidden lg:hidden xl:hidden"
            onClick={() => setShowNav(true)}
          />
        )}
        <h2 className="text-[18px] font-semibold text-primary">
          {activeChapter?.chapterTitle}
        </h2>
      </div>
      <div
        className="flex-col justify-start text-black border p-2 rounded-md mt-5 leading-9"
        dangerouslySetInnerHTML={{
          __html: activeChapter?.content?.html,
        }}
      ></div>

      <div className="flex mb-10 mt-8 items-center justify-between border  p-2 my-40">
        {checkIsChapterCompleted(activeChapter?.id) ? (
          <h2 className="line-through font-medium text-gray-500">
            Completed {activeChapter?.chapterTitle}
          </h2>
        ) : (
          <h2 className="font-medium text-green-600">
            Complete {activeChapter?.chapterTitle}
          </h2>
        )}

        {checkIsChapterCompleted(activeChapter?.id) ? (
          <button
            disabled={true}
            className="px-7 bg-gray-500 py-3 bg-primary text-white rounded-md hover:bg-gray-900 cursor-pointer"
          >
            <CheckCircle />
          </button>
        ) : (
          <button
            disabled={loading}
            onClick={() => UpdateHandler(activeChapter?.id)}
            className={`px-7 py-3  bg-primary text-white ${
              loading ? "bg-red-400 cursor-wait hover:bg-red-900" : null
            } rounded-md hover:bg-blue-900 cursor-pointer `}
          >
            {loading ? "Loading" : <CheckCheckIcon />}
          </button>
        )}
      </div>
      <div className="h-20"></div>
    </div>
  );
}

export default ChapterContent;
