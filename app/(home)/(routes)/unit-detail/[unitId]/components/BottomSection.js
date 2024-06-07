"use client";
import useAuth from "@/app/_hooks/useAuth";
import { addReview } from "@/app/_services";
import { Button } from "@/components/ui/button";
import React, { useContext, useState } from "react";

function BottomSection({ reviews, unitId, getUpdatedData, enrollment }) {
  const { userInfo } = useAuth();

  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(2);

  const AddReview = async (value) => {
    setLoading(true);
    if (review !== "") {
      await addReview(unitId, userInfo?.photoURL, userInfo?.email, value).then(
        () => {
          getUpdatedData();
          setReview("");
        }
      );
    }
    setLoading(false);
  };

  return (
    <div className="p-2 border rounded-md mt-2 ">
      <h2 className="text-gray-900 my-2">Reviews</h2>
      {enrollment?.subjectUnitId && (
        <div className="flex gap-2 border rounded-md p-4">
          <input
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Add Review"
            className="p-2 w-[100%] border-none border-b"
          />
          <Button
            disabled={!review || loading}
            className={`${
              !review || (loading && "bg-gray-600")
            } cursor-pointer`}
            onClick={() => AddReview(review)}
          >
            {loading ? "Wait.." : "Add"}
          </Button>
        </div>
      )}
      {reviews?.map((review, index) => {
        return activeIndex > index ? (
          <div key={index} className="border p-4 rounded-sm my-1">
            <div className="flex items-center gap-1 my-3">
              <img
                className="h-[30px] w-[30px] rounded-full border"
                src={review?.profileImage}
              />
              <h2>{review?.userEmail?.split("@")[0]}</h2>
            </div>
            <div>
              <p>{review?.review}</p>
            </div>
          </div>
        ) : null;
      })}

      <div>
        {activeIndex <= 2 ? (
          <h2
            onClick={() => setActiveIndex(reviews?.length)}
            className="text-gray-500 cursor-pointer underline my-2"
          >
            Show More Reviews...
          </h2>
        ) : (
          <h2
            onClick={() => setActiveIndex(2)}
            className="text-gray-500 cursor-pointer underline my-2"
          >
            Show Less Reviews
          </h2>
        )}
      </div>
    </div>
  );
}

export default BottomSection;
