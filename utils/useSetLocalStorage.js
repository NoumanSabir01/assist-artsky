import { useEffect, useState } from "react";

export function useSetLocalStorage(key) {
  const setLocalStorage = (newValue) => {
    window && localStorage.setItem(key, newValue);
  };
  return setLocalStorage;
}
