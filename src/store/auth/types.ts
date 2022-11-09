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
