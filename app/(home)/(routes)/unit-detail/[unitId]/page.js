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
import { EnrollmentContext } from "@/app/_context/EnrollmentContext";

function UnitDetails({ params }) {
  const [unit, setUnit] = useState();
  const [likedEmails, setLikedEmails] = useState([]);
  const { userInfo } = useAuth();
  const router = useRouter();
  const [enrollment, setEnrollment] = useState(null);

  useLayoutEffect(() => {
    if (!userInfo) {
      router.push("/sign-in");
    }
  }, [userInfo]);

  useLayoutEffect(() => {
    GetUnitEnrolledOrNot();

    params?.unitId && GetSubjectUnitById(params?.unitId);
    GetLikes(params?.unitId);
  }, [enrollment, userInfo]);

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
    await getUnitEnrollment(userInfo?.email, unit?.id).then(async (resp) => {
      if (resp?.enrollments[0]?.subjectUnitId) {
        await setEnrollment(resp?.enrollments[0]?.subjectUnitId === unit?.id);
      } else {
        setEnrollment(false);
      }
    });
  };

  return (
    <LikeContext.Provider value={{ likedEmails, setLikedEmails }}>
      <EnrollmentContext.Provider value={{ enrollment, setEnrollment }}>
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
                unitId={unit?.id}
                getUpdatedData={() => {
                  GetUnitEnrolledOrNot();
                  GetLikes(params?.unitId);
                }}
              />
            </div>
          </div>
        </div>
      </EnrollmentContext.Provider>
    </LikeContext.Provider>
  );
}

export default UnitDetails;
