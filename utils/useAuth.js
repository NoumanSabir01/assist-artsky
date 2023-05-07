import { useState, useEffect } from "react";
import { useRouter } from "next/router";

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

  const login = () => {
    localStorage.setItem("auth", "true");
    setAuth(true);
    router.replace("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setAuth(false);
    router.push("/sign-in");
  };

  return {
    auth,
    login,
    logout,
  };
};

export default useAuth;
