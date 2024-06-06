"use client";
import { FilterContext } from "@/app/_context/FilterContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useContext } from "react";

function CategoryFilter({ subjects }) {
  const { filter, setFilter } = useContext(FilterContext);

  return (
    subjects && (
      <div className="flex items-center justify-between">
        <h2 className="text-gray-800 font-medium">Fillter</h2>
        <Select
          className="border-none"
          onValueChange={(value) => setFilter(value)}
        >
          <SelectTrigger className="w-[50%]">
            <SelectValue placeholder={subjects[0]?.subject} />
          </SelectTrigger>
          <SelectContent>
            {subjects?.map((subject, index) => (
              <SelectItem key={index} value={subject?.subject}>
                {subject?.subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  );
}

export default CategoryFilter;
