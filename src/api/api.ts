import axios from "axios";
import {PATHS_BACK} from "utils/constances/constances";
import {checkResponceStatus, someDelay} from "utils/helpers/helpers";
import {PostedObj} from "store/date/types";

const API_URL = process.env.REACT_APP_API_URL;

const fetchData = axios.create({
  baseURL: API_URL,
});
// TODO: helpers vesus utils google

// const fetchLogin = axios.create({
//   baseURL: API_URL,
// });
// fetchLogin.interceptors.request.use(
//   request => {
//     console.log("request done");
//     return request;
//   },
//   error => {
//     console.error(error);
//   },
// );
// fetchLogin.interceptors.response.use(
//   resp => {
//     // checkResponceStatus(resp.status);

//     console.log(resp, "responce taken");
//     return resp;
//   },
//   error => {
//     console.error(error);
//   },
// );
// const fun = () => {
//   axios.get("http://localhost:3000", {
//     params: "todo-planner-remake",
//     // params:{
//     //   lang:'ru',
//     //   season:'current'
//     // }
//     // {1:'todo/dates/park'}
//     // 2: null,
//     // 3: 123,
//     // 4: false,
//     // 5: NaN,
//     // 6: undefined,
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// };
//asdasdasdasdad
// fun();

// axios({
//   method: "POST",
//   url: "http://localhost",
//   params: {
//     lang: "ru",
//   },
//   data: {user: "art", job: "web"},
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: "",
//   },
// });
export const getTokenForLogin = async ({
  userName,
  userPass,
}: {
  userName: string | null;
  userPass: string | null;
}) => {
  const responce = await fetchData.get(`${PATHS_BACK.login}`);
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
    result = gettedToken[0].token;
  } else {
    result = "";
    alert("not rigth datas");
  }
  return result;
};
export const getFetchedData = async () => {
  const responce = await fetchData.get(localStorage.tasksBase);
  checkResponceStatus(responce.status);
  return responce.data;
};
export const putFetchedData = async ({id, param}: {id: number; param: {}}) => {
  await fetchData.put(`${localStorage.tasksBase}/${id}`, {
    ...param,
  });
};
export const postFetchedData = async (obj: PostedObj) => {
  const responce = await fetchData.post(localStorage.tasksBase, {...obj});
  return responce.data;
};
export const deleteFetchedData = async (id: number) => {
  await fetchData.delete(`${localStorage.tasksBase}/${id}`);
};
