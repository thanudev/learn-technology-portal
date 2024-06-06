"use client";
import React, { useLayoutEffect, useState } from "react";
import CategoryFilter from "./_components/CategoryFilter";
import {
  getAllCategorySubjects,
  getAllSubjectUnits,
  getSubjectUnitsBySubject,
} from "@/app/_services";
import UnitList from "./_components/UnitList";
import { FilterContext } from "@/app/_context/FilterContext";

function Explore() {
  const [subjectFilters, setSubjectFilters] = useState([]);
  const [allSubjectUnits, setAllSubjectUnits] = useState([]);

  const [filter, setFilter] = useState("All");

  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    GetAllSubjectsFilter();
  }, []);

  useLayoutEffect(() => {
    SubjectHandler(filter);
  }, [filter]);

  // Subject filters
  const GetAllSubjectsFilter = async () => {
    setLoading(true);
    getAllCategorySubjects().then((response) => {
      setSubjectFilters(response?.subjs);
    });
    setLoading(false);
  };

  // get all subjects
  const GetAllSubjectUnits = async () => {
    setLoading(true);
    getAllSubjectUnits().then((response) => {
      setAllSubjectUnits(response?.subjectUnits);
    });
    setLoading(false);
  };

  // get subject by filters
  const GetAllSubjectsUnitsByFilters = (subject) => {
    setLoading(true);
    getSubjectUnitsBySubject(subject).then((response) => {
      setAllSubjectUnits(response?.subjectUnits);
    });
    setLoading(false);
  };

  const SubjectHandler = async (value) => {
    if (value === "All") {
      GetAllSubjectUnits();
    } else {
      GetAllSubjectsUnitsByFilters(value);
    }
  };

  if (loading) {
    return (
      <div className="">
        <h2>hi</h2>
      </div>
    );
  }

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      <div>
        <CategoryFilter subjects={subjectFilters} />

        <UnitList allUnitList={allSubjectUnits} />
      </div>
    </FilterContext.Provider>
  );
}

export default Explore;
