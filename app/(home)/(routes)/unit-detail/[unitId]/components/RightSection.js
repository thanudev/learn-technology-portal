"use client";
import { LoadContext } from "@/app/_context/LoadContext";
import useAuth from "@/app/_hooks/useAuth";
import { getUnitEnrollment, purchaseUnit } from "@/app/_services";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import Loading from "../../../../../../public/loading.json";

function RightSection({
  unitId,
  getUpdatedData,
  enrollment,
  setEnrollment,
  load,
  setLoad,
}) {
  const { userInfo } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    unitId && GetUnitEnrolledOrNot();
  }, []);

  const GetUnitEnrolledOrNot = async () => {
    setLoad(true);
    getUnitEnrollment(userInfo?.email, unitId)
      .then(async (resp) => {
        // console.log(resp?.enrollments);
        if (resp?.enrollments[0]?.subjectUnitId === unitId) {
          setEnrollment(resp?.enrollments[0]);
          setLoad(false);
        } else {
          setEnrollment([]);
          setLoad(false);
        }
      })
      .finally(() => {
        setLoad(false);
      });
  };

  const EnrollUnit = async () => {
    setLoading(true);
    unitId &&
      (await purchaseUnit(unitId, userInfo?.email)
        .then((resp) => {
          if (resp) {
            router.push("/learn-unit/" + unitId);

            getUpdatedData();
          } else {
            getUpdatedData();
          }
        })
        .finally(() => {
          setLoading(false);
        }));
  };

  return !loading || enrollment ? (
    <div className="border rounded-md md:mx-1 my-2 md:-my-0 p-2">
      <h2 className="text-blue-400">
        Enroll This Unit To Continue All Chapters Of This Units....(Now All
        Units Aree Free Enjoy...)
      </h2>
      {enrollment?.subjectUnitId === unitId ? (
        <button
          disabled={load}
          onClick={() => router.push("/learn-unit/" + unitId)}
          className={`w-[100%] bg-blue-500 py-4 text-white rounded-md hover:bg-blue-900 my-3 ${
            load ? "bg-gray-600" : null
          }`}
        >
          {load ? "loading..." : "Continue Unit"}
        </button>
      ) : (
        <button
          disabled={loading || load}
          onClick={EnrollUnit}
          className={`w-[100%] bg-blue-500 py-4 text-white rounded-md hover:bg-blue-900 my-3 ${
            loading || load ? "bg-gray-600 hover:bg-gray-600" : null
          }`}
        >
          {loading || load ? "Purchasing..." : "Enroll Now"}
        </button>
      )}
    </div>
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

export default RightSection;
