import React, {useState, useEffect} from "react";
import "./styles.scss";
import {useDispatch, useSelector} from "react-redux";
import {useCookies} from "react-cookie";
import {selectFetchedToken} from "store/auth/selectors";
import {checkUserName, checkLoginToken} from "store/auth/actions";
import {AppDispatch} from "store/types";

function AuthPage() {
  const fetchedToken = useSelector(selectFetchedToken);
  const [cookies, setCookies, removeCookies] = useCookies(["userToken"]);
  const [inputUserValue, setInputUserValue] = useState("");
  const [inputUserPass, setInputUserPass] = useState("");
  const [secretPass, setSecretPass] = useState<string[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (fetchedToken) {
      localStorage.setItem("userName", inputUserValue);
      dispatch(checkUserName(inputUserValue));
      setCookies("userToken", fetchedToken, {path: "todo-planner-remake/"});
      localStorage.setItem("loginUser", String(cookies.userToken));
    } else {
      localStorage.setItem("userName", "");
      dispatch(checkUserName(""));
      removeCookies("userToken", {path: "todo-planner-remake/"});
      localStorage.setItem("loginUser", "");
    }
  }, [fetchedToken]);

  const getUsersValues = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (inputUserValue && inputUserPass) {
      dispatch(
        checkLoginToken({userName: inputUserValue, userPass: inputUserPass}),
      );
    } else {
      window.alert("Fill all fields");
    }
  };

  const togglePass = (e: any) => {
    setInputUserPass(e.target.value);

    const pass = [""];
    for (let i = 0; i < e.target.value.length; i += 1) {
      pass.push("*");
    }
    console.log(e.target.value);
    setSecretPass(pass);
  };
  console.log(secretPass);
  return (
    <form className="authForm">
      <div className="authForm__block">
        <input
          onChange={e => setInputUserValue(e.target.value)}
          placeholder="userName"
        />
        <input
          onChange={togglePass}
          type="text"
          placeholder="password"
          // value={secretPass.join("")}
        />
        <button type="button" onClick={getUsersValues}>
          Enter
        </button>
      </div>
    </form>
  );
}
export default AuthPage;
