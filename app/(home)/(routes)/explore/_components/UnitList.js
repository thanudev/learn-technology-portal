"use client";
import React, { useContext } from "react";
import Unit from "./Unit";
import Skeleton from "./Skeleton";
import { FilterContext } from "@/app/_context/FilterContext";

function UnitList({ allUnitList }) {
  const { filter, setFilter } = useContext(FilterContext);
  return (
    <div>
      <h1 className="font-medium mt-5">{filter} Results</h1>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-2 rounded-lg border">
        {allUnitList
          ? allUnitList?.map((unit, index) => (
              <div key={index}>
                <Unit unit={unit} />
              </div>
            ))
          : [0, 1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
              <Skeleton key={index} />
            ))}
      </div>
    </div>
  );
}

export default UnitList;
