"use client";
import {
  getAllReviews,
  getLikes,
  getSubjectUnitById,
  getUnitEnrollment,
  purchaseUnit,
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
  const [userEnrolledUnit, setUserEnrolledUnit] = useState([]);
  const [load, setLoad] = useState(false);

  useLayoutEffect(() => {
    if (!userInfo) {
      router.push("/sign-in");
    } else {
      router.refresh();
    }
  }, [userInfo]);

  useLayoutEffect(() => {
    params?.unitId && GetSubjectUnitById(params?.unitId);
    params?.unitId && UserEnrollSubjectUnit();
    GetLikes(params?.unitId);
  }, [params?.unitId, userInfo]);

  useLayoutEffect(() => {}, []);

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

  const EnrollCourse = async () => {
    setLoad(true);
    await purchaseUnit(params?.unitId, userInfo?.email).then((resp) => {
      if (resp) {
        UserEnrollSubjectUnit();
      }
    });
    setLoad(false);
  };

  const UserEnrollSubjectUnit = () => {
    setLoad(true);
    getUnitEnrollment(userInfo?.email, params?.unitId).then((resp) => {
      setUserEnrolledUnit(resp?.enrollments);
      router.push("/learn-unit/" + params?.unitId);
    });
    setLoad(false);
  };

  return (
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
              userEnrolledUnit={userEnrolledUnit}
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
              EnrollCourse={EnrollCourse}
              unit={unit}
              userEnrolledUnit={userEnrolledUnit}
              load={load}
            />
          </div>
        </div>
      </div>
    </LikeContext.Provider>
  );
}

export default UnitDetails;
