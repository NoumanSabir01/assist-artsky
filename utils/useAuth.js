import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { auth as Auth } from "firbase/firebase";

export const useAuth = () => {
  const [auth, setAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth === "true") {
      setAuth(true);
    } else {
      setAuth(false);
      router.push("/sign-in");
    }
  }, [router.asPath]);

  const login = (token) => {
    localStorage.setItem("auth", "true");
    localStorage.setItem("token", token);
    setAuth(true);
    router.replace("/dashboard");
  };

  const logout = () => {
    setAuth(false);
    signOut(Auth)
      .then(() => {
        localStorage.removeItem("auth");
        localStorage.removeItem("token");
        router.push("/sign-in");
      })
      .catch((error) => {
        console.log("There was some error");
      });
  };

  return {
    auth,
    login,
    logout,
  };
};

export default useAuth;
