import { useEffect, useState } from "react";

export const useGetLocalStorage = (key) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
      setValue(storedValue);
    }
  }, [key]);

  return value;
};
