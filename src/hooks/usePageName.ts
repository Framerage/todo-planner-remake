import {useMemo} from "react";
import {PATHS_BASE} from "utils/constants.ts";

const useGettedPage = (pathname: string, isAuth: boolean) => {
  const getPageName = useMemo(() => {
    if (pathname === "todo-planner-remake/login" || isAuth === false) {
      return "Authorization";
    }
    if (pathname.includes(`${PATHS_BASE.calendar}/:`)) {
      return "ToDo List";
    }
    if (pathname.includes(PATHS_BASE.calendar)) {
      return "Calendar";
    }
    if (pathname.includes(`${PATHS_BASE.error}`)) {
      return "Error";
    }
    return "";
  }, [pathname, isAuth]);
  return getPageName;
};
export default useGettedPage;
