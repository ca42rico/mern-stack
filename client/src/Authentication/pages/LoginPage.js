import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { loginRequest } from "../../actions/AuthenticationActions";
import LoginComponent from "../components/LoginComponent";
import config from "../../config";
import "./AuthenticationPage.css";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const goToHomepage = () => history.push(config.HOME_PAGE);
  const goToSignInPage = () => history.push(config.SIGNIN_PAGE);

  const handleLogin = () => {
    dispatch(loginRequest({ username, password }, goToHomepage));
  };

  return (
    <LoginComponent
      setUsername={(event) => setUsername(event.target.value)}
      setPassword={(event) => setPassword(event.target.value)}
      disableSubmit={!username || !password}
      submit={() => handleLogin(username, password)}
      goToSignInPage={goToSignInPage}
    />
  );
};

export default LoginPage;
