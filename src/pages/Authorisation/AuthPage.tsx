import React, {useState, useEffect} from "react";
import "./styles.scss";
import {useDispatch, useSelector} from "react-redux";
// import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import store from "store/store";
import {selectFetchedToken} from "store/auth/selectors";
import {checkUserName, checkLoginToken} from "store/auth/actions";

type AppDispatch = typeof store.dispatch;
function AuthPage({setIsAuthSuccess}: {setIsAuthSuccess: Function}) {
  const [cookies, setCookies, removeCookies] = useCookies(["userToken"]);
  const [inputUserValue, setInputUserValue] = useState("");
  const [inputUserPass, setInputUserPass] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const fetchedToken = useSelector(selectFetchedToken);
  // const navigate = useNavigate();

  console.log(cookies, "cookies");

  useEffect(() => {
    if (fetchedToken) {
      setIsAuthSuccess(true);
      dispatch(checkUserName(inputUserValue));
      setCookies("userToken", fetchedToken, {path: "/"});
      localStorage.setItem("userCookies", fetchedToken);
      console.log("отработал авторизейшн login");
    } else {
      dispatch(checkUserName(""));
      setIsAuthSuccess(false);
      removeCookies("userToken", {path: "/"});
      localStorage.removeItem("userCookies");
      console.log("отработал авторизейшн ne login");
    }
  }, [fetchedToken]);

  const getUsersValues = (e: any) => {
    e.preventDefault();
    if (inputUserValue && inputUserPass) {
      dispatch(
        checkLoginToken({userName: inputUserValue, userPass: inputUserPass}),
      );
    } else {
      window.alert("Fill all fields");
    }
  };

  return (
    <form className="authForm">
      <div className="authForm__block">
        <input
          onChange={e => setInputUserValue(e.target.value)}
          type="text"
          placeholder="userName"
        />
        <input
          onChange={e => setInputUserPass(e.target.value)}
          type="text"
          placeholder="password"
        />
        <button type="button" onClick={getUsersValues}>
          Enter
        </button>
      </div>
    </form>
  );
}
export default AuthPage;
