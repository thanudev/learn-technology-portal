"use client";
import {
  getAllReviews,
  getLikes,
  getSubjectUnitById,
  getUnitEnrollment,
} from "@/app/_services";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useLayoutEffect, useState } from "react";
import LeftSection from "./components/LeftSection";
import useAuth from "@/app/_hooks/useAuth";
import { LikeContext } from "@/app/_context/LikeContext";
import BottomSection from "./components/BottomSection";
import RightSection from "./components/RightSection";
import { LoadContext } from "@/app/_context/LoadContext";
import Lottie from "lottie-react";
import Loading from "../../../../../public/loading.json";

function UnitDetails({ params }) {
  const [unit, setUnit] = useState();
  const [likedEmails, setLikedEmails] = useState([]);
  const { userInfo } = useAuth();
  const router = useRouter();
  const [enrollment, setEnrollment] = useState(null);
  const [load, setLoad] = useState(false);

  useLayoutEffect(() => {
    if (!userInfo) {
      router.push("/sign-in");
    } else {
      router.refresh();
    }
  }, [userInfo]);

  useLayoutEffect(() => {
    params?.unitId && GetUnitEnrolledOrNot();

    params?.unitId && GetSubjectUnitById(params?.unitId);
    GetLikes(params?.unitId);
  }, [enrollment, userInfo, params]);

  const GetSubjectUnitById = async (id) => {
    getSubjectUnitById(id).then((response) => {
      setUnit(response?.subjectUnit);
    });
  };

  const GetLikes = async (id) => {
    getLikes(id).then((resp) => {
      resp?.subjectUnit?.likes?.map((item, index) => {
        setLikedEmails((curr) => [...curr, item?.userEmail]);
      });
    });
  };

  const GetUnitEnrolledOrNot = async () => {
    setLoad(true);
    getUnitEnrollment(userInfo?.email, unit?.id).then(async (resp) => {
      // console.log(resp?.enrollments);
      if (resp?.enrollments[0]?.subjectUnitId === params?.unitId) {
        setEnrollment(resp?.enrollments[0]);
        setLoad(false);
      } else {
        setEnrollment([]);
        setLoad(false);
      }
    });
    setLoad(false);
  };

  return !load ? (
    <LoadContext.Provider value={{ load, setLoad }}>
      <LikeContext.Provider value={{ likedEmails, setLikedEmails }}>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="col-span-2">
              <LeftSection
                unit={unit}
                getLikes={() => GetLikes(params?.id)}
                getUpdatedData={() => {
                  GetSubjectUnitById(params?.unitId);
                  GetLikes(params?.unitId);
                }}
              />
              <BottomSection
                // enrollment={enrollment}
                reviews={unit?.reviews}
                unitId={params?.unitId}
                getUpdatedData={() => {
                  GetSubjectUnitById(params?.unitId);
                  GetLikes(params?.unitId);
                }}
              />
            </div>
            <div>
              <RightSection
                enrollment={enrollment}
                setEnrollment={setEnrollment}
                load={load}
                setLoad={setLoad}
                unitId={unit?.id}
                getUpdatedData={() => {
                  GetUnitEnrolledOrNot();
                  GetLikes(params?.unitId);
                }}
              />
            </div>
          </div>
        </div>
      </LikeContext.Provider>
    </LoadContext.Provider>
  ) : (
    <div className="flex items-center justify-center h-full w-full mt-20">
      <Lottie
        className="h-[200px] w-[200px]"
        animationData={Loading}
        loop={true}
      />
    </div>
  );
}

export default UnitDetails;
