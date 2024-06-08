"use client";
import { ChapterContentContext } from "@/app/_context/ChapterContentContext";

import { PauseCircle, PlayCircle } from "lucide-react";
import React, { useContext, useState } from "react";

function ChapterNavBar({ unit, closeNav, enrollment }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { activeChapter, setActiveChapter } = useContext(ChapterContentContext);

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
    unit && (
      <div className="h-full w-full">
        <div className="border-b p-5 flex-col">
          <h2 className="text-[18px] font-semibold">{unit?.unitName}</h2>
          <h2 className="text-[14px] font-light text-gray-600">
            {unit?.author}
          </h2>
        </div>

        <div className="mt-5">
          {unit?.chapters?.map((chapter, index) => {
            return (
              <div
                onClick={() => {
                  setActiveIndex(index);
                  setActiveChapter(chapter);
                  closeNav();
                }}
                key={index}
                className={`flex p-3 items-center justify-evenly hover:bg-slate-50 hover:shadow-md mb-3  rounded-md mx-1 gap-3 cursor-pointer ${
                  activeIndex == index ? "bg-blue-200 text-green-600" : null
                }`}
              >
                <h2
                  className={`font-semibold ${
                    checkIsChapterCompleted(chapter?.id) ? "line-through" : null
                  } `}
                >
                  {index + 1}.{chapter?.chapterTitle}
                </h2>
              </div>
            );
          })}
        </div>

        <div></div>
      </div>
    )
  );
}

export default ChapterNavBar;
