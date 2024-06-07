"use client";

import useAuth from "@/app/_hooks/useAuth";
import {
  getSubjectUnitById,
  getUserCompletedChapterWithEmailAndUnit,
  updateCompletedChapter,
  updatePoints,
} from "@/app/_services";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ChapterNavBar from "./components/ChapterNavBar";
import { ChapterContentContext } from "@/app/_context/ChapterContentContext";
import ChapterContent from "./components/ChapterContent";
import { Button } from "@/components/ui/button";

function LearnUnit({ params }) {
  const { userInfo } = useAuth();
  const [completedChapters, setCompletedChapters] = useState([]);
  const [enrollmentId, setEnrollmentId] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [unit, setUnit] = useState();
  const [activeChapter, setActiveChapter] = useState();
  const [sideMenu, setSideMenu] = useState(false);

  useEffect(() => {
    getChapters();

    GetUnit();
  }, [activeChapter]);

  useEffect(() => {
    GetUnit(params?.unitId);
  }, []);

  useEffect(() => {
    !userInfo ? router.push("/sign-in") : null;
  }, []);

  const GetUnit = async (id) => {
    id &&
      (await getSubjectUnitById(id).then((resp) => {
        setUnit(resp?.subjectUnit);
        setActiveChapter(resp?.subjectUnit?.chapters[0]);
      }));
  };

  const getChapters = async () => {
    setLoading(true);
    params?.unitId &&
      (await getUserCompletedChapterWithEmailAndUnit(
        params?.unitId,
        userInfo?.email
      )
        .then((response) => {
          !response?.enrollments[0]?.id && router.push("/sign-in");
          setEnrollmentId(response?.enrollments[0]?.id);
          response?.enrollments[0]?.completedChapters?.map((item, index) => {
            setCompletedChapters((curr) => [...curr, item?.chapterId]);
          });
        })
        .finally(() => {
          setLoading(false);
        }));
  };

  return (
    <ChapterContentContext.Provider value={{ activeChapter, setActiveChapter }}>
      <div className="flex">
        {/* ChapterNav */}
        <div className=" hidden md:flex xl:flex lg:flex w-72 h-screen border-r sm:flex  z-50 ">
          <ChapterNavBar
            unit={unit}
            closeNav={() => setSideMenu(false)}
            endedChapters={completedChapters}
          />
        </div>

        {sideMenu && (
          <div className="md:flex xl:flex lg:flex  w-72 h-screen border-r sm:flex  z-50 ">
            <ChapterNavBar
              unit={unit}
              closeNav={() => setSideMenu(false)}
              endedChapters={completedChapters}
            />
          </div>
        )}
        {/* Chapter Content */}
        <div className="h-screen  w-screen m-2 rounded-md p-2">
          <ChapterContent
            showNav={sideMenu}
            setShowNav={setSideMenu}
            completedChapters={completedChapters}
            loading={loading}
            setLoading={setLoading}
            enrollmentId={enrollmentId}
            getChapters={getChapters}
          />
        </div>
      </div>
    </ChapterContentContext.Provider>
  );
}

export default LearnUnit;
