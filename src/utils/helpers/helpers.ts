import {ERRORS_API} from "../constances/constances";

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
export const editFirstSymbolToUpperCase = (text: string) => {
  return text[0].toUpperCase() + text.slice(1);
};
export const checkResponceStatus = (resp: number) => {
  if (resp !== 200) {
    throw new Error(ERRORS_API[resp as keyof typeof ERRORS_API]);
  }
};
