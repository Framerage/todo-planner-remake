import instance from ".";
import {someDelay} from "../utils/helpers/index.ts";
import Cookies from "js-cookie";

export const fetchAuth = async ({
  userName,
  userPass,
}: {
  userName: string;
  userPass: string;
}) => {
  //temp logic
  const responce = await instance(`/login`);
  let result;
  if (
    responce.data.find(
      (el: {user: {userName: string; userPass: string}}) =>
        el.user.userName === userName && el.user.userPass === userPass,
    )
  ) {
    const gettedToken = responce.data.filter(
      (el: {user: {userName: string; userPass: string}; token: string}) =>
        el.user.userName === userName && el.user.userPass === userPass,
    );
    localStorage.setItem("tasksBase", gettedToken[0].user.dataBase);
    await someDelay(2000);
    localStorage.setItem("userName", userName);
    Cookies.set("accTkn", gettedToken[0].token);

    result = gettedToken[0].token;
  } else {
    result = "";
    alert("not rigth datas");
  }
  return !!result;
};
