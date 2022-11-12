import React, {useState, useEffect} from "react";
import "./styles.scss";
import {useDispatch, useSelector} from "react-redux";
import {useCookies} from "react-cookie";
import store from "store/store";
import {selectFetchedToken} from "store/auth/selectors";
import {checkUserName, checkLoginToken} from "store/auth/actions";

type AppDispatch = typeof store.dispatch;
function AuthPage() {
  const [cookies, setCookies, removeCookies] = useCookies(["userToken"]);
  const [inputUserValue, setInputUserValue] = useState("");
  const [inputUserPass, setInputUserPass] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const fetchedToken = useSelector(selectFetchedToken);

  useEffect(() => {
    if (fetchedToken) {
      dispatch(checkUserName(inputUserValue));
      setCookies("userToken", fetchedToken, {path: "todo-planner-remake/"});
      localStorage.setItem("loginUser", String(cookies.userToken));
    } else {
      dispatch(checkUserName(""));
      removeCookies("userToken", {path: "todo-planner-remake/"});
      localStorage.setItem("loginUser", "");
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
  const keyBoardEvent = (e: any) => {
    const ev = e || window.event;
    if (ev.keyCode === 13 || ev.which) {
      getUsersValues(e);
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
        <button
          type="button"
          onClick={getUsersValues}
          onKeyPress={e => keyBoardEvent(e)}
        >
          Enter
        </button>
      </div>
    </form>
  );
}
export default AuthPage;
