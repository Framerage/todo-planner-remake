import {useForm} from "react-hook-form";
import authStore from "store/auth.ts";
import styles from "./styles.module.scss";

interface LoginFormData {
  userName: string;
  userPass: string;
}
const AuthPage = () => {
  const {register, handleSubmit} = useForm<LoginFormData>();
  const handleAuth = (data: {userName: string; userPass: string}) => {
    authStore.fetchAuth({userName: data.userName, userPass: data.userPass});
  };
  return (
    <form className={styles.authForm} onSubmit={handleSubmit(handleAuth)}>
      <input
        {...register("userName", {required: true})}
        className={styles.formInput}
      />
      <input
        type="password"
        {...register("userPass", {required: true})}
        className={styles.formInput}
      />
      <button type="submit" className={styles.formBtn}>
        Enter
      </button>
    </form>
  );
};
export default AuthPage;
