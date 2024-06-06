"use client";
import { EnrollmentContext } from "@/app/_context/EnrollmentContext";
import useAuth from "@/app/_hooks/useAuth";
import { getUnitEnrollment, purchaseUnit } from "@/app/_services";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useContext, useLayoutEffect, useState } from "react";

function RightSection({ unitId, getUpdatedData }) {
  const { enrollment, setEnrollment } = useContext(EnrollmentContext);
  const { userInfo } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const EnrollUnit = async () => {
    setLoading(true);
    unitId &&
      (await purchaseUnit(unitId, userInfo?.email).then((resp) => {
        if (resp) {
          getUpdatedData();
          setEnrollment(true);
        }
      }));
    setLoading(false);
  };
  return (
    <div className="border rounded-md md:mx-1 my-2 md:-my-0 p-2">
      <h2 className="text-blue-400">
        Enroll This Unit To Continue All Chapters Of This Units....(Now All
        Units Aree Free Enjoy...)
      </h2>
      {enrollment ? (
        <Button
          onClick={() => router.push("/learn-unit")}
          className={`w-[100%] my-3`}
        >
          Continue Unit
        </Button>
      ) : (
        <Button
          disables={loading}
          onClick={EnrollUnit}
          className={`w-[100%] my-3 ${loading && "bg-gray-600"}`}
        >
          {loading ? "Purchasing..." : "Enroll Now"}
        </Button>
      )}
    </div>
  );
}

export default RightSection;
