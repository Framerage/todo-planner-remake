// import axios from "axios";

import axios from "axios";
import {PATHS_BACK} from "constances/constances";
import {checkResponceStatus} from "helpers/helpers";
import {PostedObj} from "store/date/types";
// import {PostedObj} from "store/date/types";

const API_URL = process.env.REACT_APP_API_URL;

const fetchData = axios.create({
  baseURL: API_URL,
});
// TODO: настроить axios instance для настройки урлы по дефолту+
// TODO: helpers vesus utils google
// const instance = axios.create({
//   baseURL: API_URL,
// });
// const getApi = (params: string) => {
//   const param = params ? `/${params}` : "";

//   // TODO: почитать про передачу параметров и тела запроса в axios
//   // TODO: перенестю весь axios сюда +

//   return `${API_URL}${param}`;
// };

// const fun = () =>{
//   axios.get('http://localhost:3001', {params:{
//     1:'   ',
//     2:null,
//     3:123,
//     4:false,
//     5:NaN,
//     6: undefined
//   }})
// };

// fun()
// export default getApi;

export const getTokenForLogin = async ({
  userName,
  userPass,
}: {
  userName: string | null;
  userPass: string | null;
}) => {
  if (userName && userPass) {
    const responce = await fetchData.get(PATHS_BACK.login);
    checkResponceStatus(responce.status);
    const gettedToken = responce.data.filter(
      (el: {user: {userName: string; userPass: string}; token: string}) =>
        el.user.userName === userName && el.user.userPass === userPass,
    );
    return gettedToken[0].token;
  }
};
export const getFetchedData = async () => {
  const responce = await fetchData.get(PATHS_BACK.taskBase);
  checkResponceStatus(responce.status);
  return responce.data;
};
export const putFetchedData = async ({id, param}: {id: number; param: {}}) => {
  const responce = await fetchData.put(`${PATHS_BACK.taskBase}/${id}`, {
    ...param,
  });
  return responce.status === 200;
};
export const postFetchedData = async (obj: PostedObj) => {
  const responce = await fetchData.post(PATHS_BACK.taskBase, {...obj});
  // checkResponceStatus(responce.status);
  return responce.data;
};
// захватчик аксиос для responce.status
export const deleteFetchedData = async (id: number) => {
  await fetchData.delete(`${PATHS_BACK.taskBase}/${id}`);
};
