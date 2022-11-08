export type AuthStateProps = {
  auth: {
    isAuth: boolean;
    userName: string;
    isFetchAuth: {
      id: string;
      user: {
        userName: string;
        password: string;
      };
    };
  };
};
