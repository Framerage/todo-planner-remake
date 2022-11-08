import axios from "axios";


const API_URL = process.env.REACT_APP_API_URL;
//const API_URL = 'http://localhost:3001';
//const API_URL = 'https://6358f633ff3d7bddb99513ad.mockapi.io';


// TODO: настроить axios instance для настройки урлы по дефолту
export const getApi=(params:string)=> {
  const param = params ? `/${params}` : '';


// TODO: почитать про передачу параметров и тела запроса в axios 
// TODO: перенестю весь axios сюда



  return `${API_URL}${param}`;
}



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