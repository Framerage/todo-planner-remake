import {AuthStateProps} from "./types";

const initialStateAuth: AuthStateProps = {
  isLoading: false,
  fetchedLoginBase: [
    {
      id: "",
      user: {
        userName: "",
        password: "",
      },
    },
  ],
  fetchedToken: "",
  isErrorFetch: null,
  isAuth: false,
  userName: localStorage.userName,
  error: null,
};
export default initialStateAuth;
