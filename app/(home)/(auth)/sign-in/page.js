"use client";
import useAuth from "@/app/_hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect } from "react";
import { ImGoogle, ImGoogle2 } from "react-icons/im";

function SignIn() {
  const { userInfo, signIn, loading } = useAuth();
  const router = useRouter();

  useLayoutEffect(() => {
    if (userInfo) {
      router.push("/explore");
    }
  }, []);

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg rounded-md border p-5">
        <h1 className="text-center text-2xl font-bold text-primary sm:text-3xl">
          Get Started With Learn Technology Portal
        </h1>

        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          create an account to access the subject's courses for free. and you
          can download all subject a/l pastpapers as well
        </p>

        <form
          action="#"
          className="mb-0 mt-6 space-y-4 rounded-lg p-4  sm:p-6 lg:p-8"
        >
          <p className="text-center text-lg font-medium">
            Sign in to your account
          </p>

          <div
            onClick={!loading ? signIn : null}
            className={`w-full rounded-lg bg-primary px-5 py-3 text-md font-medium text-white flex items-center justify-center gap-5 cursor-pointer ${
              loading && "bg-gray-400 hover:cursor-progress"
            } `}
          >
            <ImGoogle2 className="rounded-full h-[30px] w-[30px]" />
            <h2>Sign in with google</h2>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
