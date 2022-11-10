export type AuthStateProps = {
  auth: {
    isAuth: boolean;
    userName: string;
    isLoading: boolean;
    fetchedLoginBase: [
      {
        id: string;
        user: {
          userName: string;
          password: string;
        };
      },
    ];
    fetchedToken: string;
    isErrorFetch: null;
    error: null;
  };
};
export type CheckAuthType = {type: string; payload: boolean};
export type CheckUserNameType = {type: string; payload: string};
