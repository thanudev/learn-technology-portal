"use client";
import auth from "@/firebase-config";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createUser } from "../_services";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);

  const router = useRouter();

  const checkLocalUser = async () => {
    let userData = localStorage.getItem("#user");
    userData = userData ? JSON.parse(userData) : null;
    await setUserInfo(userData);
  };

  useEffect(() => {
    // Check Have Local User Or not
    checkLocalUser();

    // On auth state changed runs when every auth changing
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo(user);
      } else {
        setUserInfo(null);
      }
    });
    setLoadingInitial(false);
    return () => unsubscribe;
  }, []);

  const signIn = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    if (user) {
      await createUser(
        user?.email,
        user.uid,
        10,
        user?.photoURL,
        user.displayName
      ).then((resp) => {
        console.log(resp);
      });
      await localStorage.setItem("#user", JSON.stringify(user));
      router.push("/");
    }
    setLoading(false);
  };

  const logOut = async () => {
    await signOut(auth).then(() => {
      setUserInfo(null);
    });
  };

  const memoredValue = useMemo(() => {
    return {
      userInfo,
      loading,
      signIn,
      logOut,
    };
  }, [userInfo, loading]);

  return (
    <AuthContext.Provider value={memoredValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
