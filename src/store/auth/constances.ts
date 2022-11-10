import {AuthStateProps} from "./types";

const initialStateAuth: AuthStateProps["auth"] = {
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
  userName: "",
  error: null,
};
export default initialStateAuth;
