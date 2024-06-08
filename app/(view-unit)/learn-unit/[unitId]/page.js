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
  const [enrollment, setEnrollment] = useState();
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
          setEnrollment(response?.enrollments[0]);
        })
        .finally(() => {
          setLoading(false);
        }));
  };

  const UpdateHandler = async (id) => {
    setLoading(true);

    enrollmentId &&
      updateCompletedChapter(enrollmentId, id)
        .then(async (resp) => {
          if (resp) {
            await updatePoints(
              userInfo?.email,
              parseInt(activeChapter?.content?.text?.length / 100)
            ).then((response) => {
              if (response) {
                getChapters();
              }
            });
          }
        })
        .finally(() => {
          setLoading(false);
        });
  };

  return (
    <ChapterContentContext.Provider value={{ activeChapter, setActiveChapter }}>
      <div className="flex">
        {/* ChapterNav */}
        <div className=" hidden md:flex xl:flex lg:flex w-72 h-screen border-r sm:flex  z-50 ">
          <ChapterNavBar
            unit={unit}
            closeNav={() => setSideMenu(false)}
            enrollment={enrollment}
          />
        </div>

        {sideMenu && (
          <div className="md:flex xl:flex lg:flex  w-72 h-screen border-r sm:flex  z-50 ">
            <ChapterNavBar
              unit={unit}
              closeNav={() => setSideMenu(false)}
              enrollment={enrollment}
            />
          </div>
        )}
        {/* Chapter Content */}
        <div className="h-screen  w-screen m-2 rounded-md p-2">
          <ChapterContent
            showNav={sideMenu}
            setShowNav={setSideMenu}
            loading={loading}
            enrollment={enrollment}
            UpdateHandler={UpdateHandler}
          />
        </div>
      </div>
    </ChapterContentContext.Provider>
  );
}

export default LearnUnit;
