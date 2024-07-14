import {fetchAuth} from "../../api/auth";
import classes from "./styles.module.scss";
import {useForm} from "react-hook-form";

interface LoginFormData {
  userName: string;
  userPass: string;
}
const AuthPage = () => {
  const {register, handleSubmit} = useForm<LoginFormData>();

  const handleAuth = (data: {userName: string; userPass: string}) => {
    fetchAuth({userName: data.userName, userPass: data.userPass});
  };
  return (
    <form className={classes.authForm} onSubmit={handleSubmit(handleAuth)}>
      <input
        {...register("userName", {required: true})}
        className={classes.formInput}
      />
      <input
        type="password"
        {...register("userPass", {required: true})}
        className={classes.formInput}
      />
      <button type="submit" className={classes.formBtn}>
        Enter
      </button>
    </form>
  );
};
export default AuthPage;
