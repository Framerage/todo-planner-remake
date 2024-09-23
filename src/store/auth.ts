import instance from "api/index";
import Cookies from "js-cookie";
import {makeAutoObservable} from "mobx";

interface IAuthInitialStore {
  isAuth: boolean;
  authError: string | null;
}
class AuthStore implements IAuthInitialStore {
  isAuth = false;

  authIsLoading = false;

  authError = null;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(auth: boolean) {
    this.isAuth = auth;
  }

  resetAuth() {
    this.isAuth = false;
  }

  fetchAuth({userName, userPass}: {userName: string; userPass: string}) {
    // temp logic
    this.authIsLoading = true;
    instance("/login")
      .then(res => {
        const user = res.data.find(
          (el: {user: {userName: string; userPass: string}}) =>
            el.user.userName === userName && el.user.userPass === userPass,
        );
        localStorage.setItem("tasksBase", user.user.dataBase);
        localStorage.setItem("userName", userName);
        Cookies.set("accTkn", user.token);
        this.isAuth = !!user.token;
        this.authIsLoading = false;
      })
      .catch(err => {
        this.isAuth = false;
        this.authError = err;
        alert("not rigth datas");
        this.authIsLoading = false;
      });
  }
}
export default new AuthStore();
