import { LikeContext } from "@/app/_context/LikeContext";
import { LoadContext } from "@/app/_context/LoadContext";
import useAuth from "@/app/_hooks/useAuth";
import { getUnitEnrollment } from "@/app/_services";
import { useRouter } from "next/navigation";
import React, { useContext, useLayoutEffect, useState } from "react";

function RightSection({ EnrollCourse, userEnrolledUnit, unit, load }) {
  const router = useRouter();
  return (
    <div className="border p-2 md:ml-2 mt-2 md:mt-0 rounded-md">
      {userEnrolledUnit?.length !== 0 ? (
        <h2 className="text-blue-400">
          You Now Continuing {unit?.unitName}...{" "}
        </h2>
      ) : (
        <h2 className="text-blue-400">
          Enroll This Unit To Continue All Chapters Of This Units....(Now All
          Units Aree Free Enjoy...)
        </h2>
      )}
      <div className="flex mt-4 justify-center">
        {userEnrolledUnit?.length === 0 ? (
          <button
            disabled={load}
            onClick={EnrollCourse}
            className={`py-2 px-10 bg-primary text-white rounded-md cursor-pointer hover:bg-blue-900 
            ${load && "bg-gray-300 hover:bg-gray-200"}
            `}
          >
            Enroll Now
          </button>
        ) : (
          <button
            onClick={() => router.push("/learn-unit/" + unit?.id)}
            className={`py-2 px-10 bg-primary text-white rounded-md cursor-pointer hover:bg-blue-900  ${
              load && "bg-gray-300 hover:bg-gray-200"
            }`}
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}

export default RightSection;
