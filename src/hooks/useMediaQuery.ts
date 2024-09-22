import {useSyncExternalStore} from "react";
/**
 * @param query условие проверки размеров экрана в строковом формате /
 *  Conditions for checking screen sizes in string format, example "(min-width: 1024px)"
 * @returns возвращает true / false по условию / return boolean true/false by condition
 */
export const useMediaQuery = (query: string): boolean => {
  const getSnapShot = () => window.matchMedia(query).matches;

  const querySubscriber = (cb: () => void) => {
    const mediaQueryList = window.matchMedia(query);
    mediaQueryList.addEventListener("change", cb);
    return () => mediaQueryList.removeEventListener("change", cb);
  };

  return useSyncExternalStore(querySubscriber, getSnapShot);
};
