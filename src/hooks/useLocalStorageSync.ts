import {useSyncExternalStore} from "react";

export const useLocalStorageSync = <T>(key: string, initialValue?: T) => {
  const getSnapShot = (): string => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  };

  const storageSubscriber = (cb: () => void) => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key) {
        cb();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  };

  const currentValue = useSyncExternalStore(storageSubscriber, getSnapShot);

  const setCurrentValue = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
  };
  return [currentValue, setCurrentValue];
};
