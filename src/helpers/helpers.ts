import {pathsBase} from "../constances/constances";

export const getPageName = (pathname: string, isAuth: boolean) => {
  if (pathname === "/login" || isAuth === false) {
    return "Authorization";
  }

  if (pathname.includes(pathsBase.calendar)) {
    return "Calendar";
  }

  if (pathname.includes(`${pathsBase.calendar}/:`)) {
    return "ToDo List";
  }

  if (pathname.includes(`${pathsBase.error}`)) {
    return "Error";
  }
  return "";
};
export const getFullChoosedDate = (
  choosedYear: number,
  choosedMonth: number,
  choosedDate: number,
  increaser: number,
) =>
  // 2022-10-10
  new Date(
    new Date(choosedYear, choosedMonth, choosedDate).getTime() + increaser,
  )
    .toLocaleDateString()
    .split(".")
    .reverse()
    .join("-");
export const getFetchedTimeStamp = (date: string) => new Date(date);
export const someDelay = async (num: number) => {
  new Promise(resolve => setTimeout(resolve, num));
};
