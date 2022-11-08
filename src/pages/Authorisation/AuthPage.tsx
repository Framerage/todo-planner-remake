import React, {useState} from "react";
import "./styles.scss";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {pathsBack, pathsBase} from "constances/constances";
// import {selectFetchAuth} from "store/auth/selectors";
import {useCookies} from "react-cookie";
import axios from "axios";
import getApi from "api/api";
import store from "store/store";
import {checkFetchAuth, checkUserName} from "../../store/auth/actions";
import globalTheme from "../../styles/globalColors.scss";

type AppDispatch = typeof store.dispatch;
function AuthPage({setIsAuthSuccess}: {setIsAuthSuccess: Function}) {
  const [cookies, setCookies, removeCookies] = useCookies(["userToken"]);
  const [inputUserValue, setInputUserValue] = useState("");
  const [inputUserPass, setInputUserPass] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  // function setLoginUser(inputUserValue: string): any {
  //   throw new Error("Function not implemented.");
  // }
  // const fetchAuth = useSelector(selectFetchAuth);
  // console.log(fetchAuth, 'fetchAuth');
  const getAuthToken = () => {
    axios
      .get(
        getApi(pathsBack.login),
        //  {
        //   user: {
        //     userName: inputUserValue,
        //     userPass: inputUserPass,
        //   }}
      )
      .then(({data}) => {
        const fetchToken = data.find(
          (el: {token: string; user: {userName: string; userPass: string}}) => {
            if (
              el.user.userName === inputUserValue &&
              el.user.userPass === inputUserPass
            ) {
              return el;
            }
            return el;
          },
        );
        if (fetchToken) {
          setCookies("userToken", fetchToken.token, {path: "/"});
          localStorage.setItem("userCookies", fetchToken.token);
          return fetchToken;
        }
        removeCookies("userToken", {path: "/"});
        localStorage.removeItem("userCookies");
        window.alert("неверные данные");
      });
    // console.log(cookies, " cookies");
    if (
      inputUserValue.length !== 0 &&
      inputUserPass.length !== 0 &&
      !!localStorage.userCookies
    ) {
      setIsAuthSuccess(true);
      dispatch(checkUserName(inputUserValue));
      navigate(pathsBase.calendar);
    } else {
      dispatch(checkUserName(""));
      setIsAuthSuccess(false);
    }
  };
  const getUsersValues = (e: any) => {
    e.preventDefault();
    getAuthToken();
    // dispatch(checkFetchAuth());
  };

  // const testFetch = useSelector(selectFetchAuth);
  // console.log(testFetch);

  const testThunk = (e: any) => {
    e.preventDefault();
    dispatch(checkFetchAuth({userName: "click"}));
  };
  return (
    <form className='authForm'>
      <div className='authForm__block'>
        <input
          onChange={e => setInputUserValue(e.target.value)}
          type='text'
          placeholder='userName'
        />
        <input
          onChange={e => setInputUserPass(e.target.value)}
          type='text'
          placeholder='password'
        />
        <button type='button' onClick={getUsersValues}>
          Enter
        </button>
        <button type='button' onClick={e => testThunk(e)}>
          Test
        </button>
      </div>
    </form>
  );
}
export default AuthPage;
