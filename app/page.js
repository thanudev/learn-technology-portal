"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  // Redirect To Explore Screen When User Entered The Site
  useEffect(() => {
    router.push("/explore");
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <h2>Loading....</h2>
    </div>
  );
}
